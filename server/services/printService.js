import { SerialPort } from 'serialport';

// ⚙️ Port COM Bluetooth (Gestionnaire de périphériques → Ports COM et LPT)
const PRINTER_COM_PORT = 'COM5';
const BAUD_RATE = 9600;

// ─── Commandes ESC/POS ───────────────────────────────────────────────────────
const ESC = 0x1b;
const GS  = 0x1d;

const CMD_INIT         = Buffer.from([ESC, 0x40]);              // Initialiser imprimante
const CMD_BOLD_ON      = Buffer.from([ESC, 0x45, 0x01]);        // Gras ON
const CMD_BOLD_OFF     = Buffer.from([ESC, 0x45, 0x00]);        // Gras OFF
const CMD_ALIGN_CENTER = Buffer.from([ESC, 0x61, 0x01]);        // Centrer
const CMD_ALIGN_LEFT   = Buffer.from([ESC, 0x61, 0x00]);        // Aligner à gauche
const CMD_FEED_AND_CUT = Buffer.from([ESC, 0x64, 0x04,          // Avancer 4 lignes
                                      GS,  0x56, 0x42, 0x00]); // Couper le papier

// Convertit une chaîne en Buffer avec saut de ligne
function line(str = '') {
  return Buffer.from(str + '\r\n', 'latin1');
}

// ─── Fonction principale ─────────────────────────────────────────────────────
/**
 * Imprime un ticket de commande sur l'imprimante thermique Bluetooth.
 * @param {Array<{ name: string, quantity: number }>} items
 */
export async function printOrderTicket(items) {
  const SEPARATOR = '--------------------------------';
  const THIN_SEP  = '- - - - - - - - - - - - - - - -';

  // Ordre dans chaque section : entrée → dessert → boisson → plat
  const CATEGORY_ORDER = ['entr', 'dessert', 'boisson', 'plat'];

  function categoryRank(item) {
    const cat = (item.category || '').toLowerCase();
    const idx = CATEGORY_ORDER.findIndex((k) => cat.includes(k));
    return idx === -1 ? 99 : idx;
  }

  function sortGroup(group) {
    return [...group].sort((a, b) => categoryRank(a) - categoryRank(b));
  }

  // Regrouper : menuGroup → menuInstance → items[]
  const menuGroups = {}; // { "Grande Faim": { 0: [...], 1: [...] } }
  const unitaires  = [];

  items.forEach((item) => {
    if (item.menuGroup) {
      if (!menuGroups[item.menuGroup]) menuGroups[item.menuGroup] = {};
      const inst = item.menuInstance ?? 0;
      if (!menuGroups[item.menuGroup][inst]) menuGroups[item.menuGroup][inst] = [];
      menuGroups[item.menuGroup][inst].push(item);
    } else {
      unitaires.push(item);
    }
  });

  // Titre de section centré avec compteur à gauche
  function sectionHeader(title, count) {
    const label = count > 1 ? `${count}x  ${title}` : title;
    return [
      line(SEPARATOR),
      CMD_ALIGN_CENTER,
      CMD_BOLD_ON,
      line(label),
      CMD_BOLD_OFF,
      CMD_ALIGN_LEFT,
      line(SEPARATOR),
    ];
  }

  const chunks = [
    CMD_INIT,
    CMD_ALIGN_CENTER,
    CMD_BOLD_ON,
    line('Bon de Preparation'),
    CMD_BOLD_OFF,
    CMD_ALIGN_LEFT,
    line(SEPARATOR),
    CMD_BOLD_ON,
    line('Qts     Article'),
    CMD_BOLD_OFF,
    line(SEPARATOR),
  ];

  // ── Sections menus ──
  for (const [groupName, instances] of Object.entries(menuGroups)) {
    const instanceList = Object.values(instances);
    chunks.push(...sectionHeader(`Menu ${groupName}`, instanceList.length));

    // Fusionner les articles identiques (même nom) toutes instances confondues
    const merged = {};
    instanceList.flat().forEach((item) => {
      if (merged[item.name]) {
        merged[item.name].quantity += item.quantity;
      } else {
        merged[item.name] = { ...item };
      }
    });

    sortGroup(Object.values(merged)).forEach((item) => {
      const qty = String(item.quantity).padEnd(8);
      chunks.push(line(`${qty}${item.name}`));
    });

    chunks.push(line(''));
  }

  // ── Section produits unitaires ──
  if (unitaires.length > 0) {
    const totalQty = unitaires.reduce((s, i) => s + i.quantity, 0);
    chunks.push(...sectionHeader('Produits Unitaires', totalQty));
    sortGroup(unitaires).forEach((item) => {
      const qty = String(item.quantity).padEnd(8);
      chunks.push(line(`${qty}${item.name}`));
    });
    chunks.push(line(''));
  }

  chunks.push(CMD_FEED_AND_CUT);

  const data = Buffer.concat(chunks);
  await writeToPort(data);
}

// ─── Envoi sur le port COM Bluetooth ─────────────────────────────────────────
function writeToPort(data) {
  return new Promise((resolve, reject) => {
    const port = new SerialPort({
      path: PRINTER_COM_PORT,
      baudRate: BAUD_RATE,
      autoOpen: false,
    });

    port.open((openErr) => {
      if (openErr) {
        return reject(
          new Error(`Impossible d'ouvrir ${PRINTER_COM_PORT} : ${openErr.message}`),
        );
      }

      port.write(data, (writeErr) => {
        if (writeErr) {
          port.close();
          return reject(new Error(`Erreur écriture imprimante : ${writeErr.message}`));
        }

        port.drain((drainErr) => {
          port.close();
          if (drainErr) {
            return reject(new Error(`Erreur drain : ${drainErr.message}`));
          }
          console.log('[Impression] Ticket envoyé sur', PRINTER_COM_PORT);
          resolve();
        });
      });
    });

    port.on('error', (err) => {
      reject(new Error(`Erreur port série ${PRINTER_COM_PORT} : ${err.message}`));
    });
  });
}
