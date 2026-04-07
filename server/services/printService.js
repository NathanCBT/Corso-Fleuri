// import { SerialPort } from 'serialport';
//
// // ⚙️ À CONFIGURER — numéro du port COM Bluetooth (Gestionnaire de périphériques → Ports COM et LPT)
// const PRINTER_COM_PORT = 'COM5';
// const BAUD_RATE = 9600;
//
// // ─── Commandes ESC/POS ───────────────────────────────────────────────────────
// const ESC = 0x1b;
// const GS  = 0x1d;
//
// const CMD_INIT         = Buffer.from([ESC, 0x40]);              // Initialiser imprimante
// const CMD_BOLD_ON      = Buffer.from([ESC, 0x45, 0x01]);        // Gras ON
// const CMD_BOLD_OFF     = Buffer.from([ESC, 0x45, 0x00]);        // Gras OFF
// const CMD_ALIGN_CENTER = Buffer.from([ESC, 0x61, 0x01]);        // Centrer
// const CMD_ALIGN_LEFT   = Buffer.from([ESC, 0x61, 0x00]);        // Aligner à gauche
// const CMD_FEED_AND_CUT = Buffer.from([ESC, 0x64, 0x04,          // Avancer 4 lignes
//                                       GS,  0x56, 0x42, 0x00]); // Couper le papier
//
// // Convertit une chaîne en Buffer avec saut de ligne
// function line(str = '') {
//   return Buffer.from(str + '\r\n', 'latin1');
// }
//
// // ─── Fonction principale ─────────────────────────────────────────────────────
// /**
//  * Imprime un ticket de commande sur l'imprimante thermique Bluetooth.
//  * @param {Array<{ name: string, quantity: number }>} items
//  */
// export async function printOrderTicket(items) {
//   const SEPARATOR = '--------------------------------';
//
//   const chunks = [
//     CMD_INIT,
//     CMD_ALIGN_CENTER,
//     CMD_BOLD_ON,
//     line('Order Voucher'),
//     CMD_BOLD_OFF,
//     CMD_ALIGN_LEFT,
//     line(SEPARATOR),
//     line('Qte   Article'),
//     line(SEPARATOR),
//     ...items.map((item) => {
//       const qty = String(item.quantity).padEnd(6);
//       return line(`${qty}${item.name}`);
//     }),
//     CMD_FEED_AND_CUT,
//   ];
//
//   const data = Buffer.concat(chunks);
//   await writeToPort(data);
// }
//
// // ─── Envoi sur le port COM Bluetooth ─────────────────────────────────────────
// function writeToPort(data) {
//   return new Promise((resolve, reject) => {
//     const port = new SerialPort({
//       path: PRINTER_COM_PORT,
//       baudRate: BAUD_RATE,
//       autoOpen: false,
//     });
//
//     port.open((openErr) => {
//       if (openErr) {
//         return reject(
//           new Error(`Impossible d'ouvrir ${PRINTER_COM_PORT} : ${openErr.message}`),
//         );
//       }
//
//       port.write(data, (writeErr) => {
//         if (writeErr) {
//           port.close();
//           return reject(new Error(`Erreur écriture imprimante : ${writeErr.message}`));
//         }
//
//         port.drain((drainErr) => {
//           port.close();
//           if (drainErr) {
//             return reject(new Error(`Erreur drain : ${drainErr.message}`));
//           }
//           resolve();
//         });
//       });
//     });
//
//     port.on('error', (err) => {
//       reject(new Error(`Erreur port série ${PRINTER_COM_PORT} : ${err.message}`));
//     });
//   });
// }
