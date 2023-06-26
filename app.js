const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Menyajikan file statis dari folder "public"
app.use(express.static('public'));

// Mengatur rute utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Menerima koneksi socket
io.on('connection', (socket) => {
  console.log('User terhubung');
  
  // Menerima pesan dari klien
  socket.on('chat message', (msg) => {
    console.log('Pesan diterima: ' + msg);
    
    // Mengirim pesan ke semua klien, termasuk pengirimnya
    io.emit('chat message', msg);
  });
  
  // Menangani saat koneksi socket ditutup
  socket.on('disconnect', () => {
    console.log('User terputus');
  });
});

// Menjalankan server
const port = 3000;
http.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
