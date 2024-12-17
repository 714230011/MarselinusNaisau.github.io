const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
const addNodeBtn = document.getElementById('addNodeBtn');
const clearBtn = document.getElementById('clearBtn');
const statusText = document.getElementById('status');

let nodes = [];
let connections = [];
let isDrawingLine = false;

// Atur ukuran canvas
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Fungsi untuk menggambar node
function drawNode(x, y, id) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#4CAF50';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(id, x, y + 5);
}

// Fungsi menggambar semua node dan koneksi
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Gambar koneksi
    connections.forEach(conn => {
        ctx.beginPath();
        ctx.moveTo(conn.start.x, conn.start.y);
        ctx.lineTo(conn.end.x, conn.end.y);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
    });
    // Gambar node
    nodes.forEach(node => drawNode(node.x, node.y, node.id));
}

// Tambah node baru
addNodeBtn.addEventListener('click', () => {
    const id = nodes.length + 1;
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    nodes.push({ x, y, id });
    redrawCanvas();
});

// Reset canvas
clearBtn.addEventListener('click', () => {
    nodes = [];
    connections = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    statusText.textContent = 'Status: Jaringan Normal';
});

// Tangani event klik untuk membuat koneksi antar node
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    const clickedNode = nodes.find(node => Math.hypot(node.x - x, node.y - y) < 20);

    if (clickedNode) {
        if (!isDrawingLine) {
            isDrawingLine = clickedNode;
        } else {
            connections.push({ start: isDrawingLine, end: clickedNode });
            isDrawingLine = false;
            redrawCanvas();
        }
    }
});
