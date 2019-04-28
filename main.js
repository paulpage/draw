var c, ctx, down, lastMousePos, mousePos;
var colorCanvas;
var brushSize;
var colors = [
    'black',
    'white',
    'red',
    'blue',
    'green',
    'purple',
    'orange'
];

// Gui elements
gui = {}

window.onload = function() {
    c = document.getElementById('canvas');
    ctx = c.getContext('2d');

    colorCanvas = document.createElement('canvas'); 
    colorCanvas.width = 40;
    colorCanvas.height = 400;
    colorCanvas.style = 'border: 1px solid black';
    document.getElementById('colors').appendChild(colorCanvas);

    gui = {
        width: document.getElementById('width'),
        height: document.getElementById('height')
    };

    c.width = 800;
    c.height = 600;

    clear();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    document.getElementById('brushsize_decrease').addEventListener('click', function(e) {
        document.getElementById('brushsize').value = parseInt(document.getElementById('brushsize').value) - 1;
    });

    document.getElementById('brushsize_increase').addEventListener('click', function(e) {
        document.getElementById('brushsize').value = parseInt(document.getElementById('brushsize').value) + 1;
    });

    drawColors();

    document.addEventListener('mousedown', handleMouseDown);

    document.addEventListener('mouseup', function(e) {
        down = false;
    });

    document.addEventListener('mousemove', function(e) {
        var rect = c.getBoundingClientRect();
        lastMousePos = mousePos;
        mousePos = getMousePos(e, c);
        if (down) {
            draw();
        }
    });

    document.getElementById('clear').addEventListener('click', function(e) {
        clear();
    });

}

function handleMouseDown(e) {
    down = true;

    brushSize = document.getElementById('brushsize').value;
    ctx.lineWidth = brushSize;

    var mousePos = getMousePos(e, colorCanvas);
    if (isBounded(mousePos, colorCanvas)) {
        i = Math.floor(mousePos.y / colorCanvas.height * colors.length);
        ctx.strokeStyle = colors[i];
    }
}

function getMousePos(e, canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function isBounded(pos, canvas) {
    return (pos.x >= 0 && pos.x <= canvas.width
        && pos.y >= 0 && pos.y <= canvas.height);
}

function drawColors() {
    var colorCtx = colorCanvas.getContext('2d');
    colorCtx.fillStyle = 'gray';
    colorCtx.fillRect(0, 0, colorCanvas.width, colorCanvas.height);

    var blockHeight = colorCanvas.height / colors.length;
    for (var i = 0; i < colors.length; i++) {
        colorCtx.fillStyle = colors[i];
        colorCtx.fillRect(0, blockHeight * i, colorCanvas.width, blockHeight * (i + 1));
    }

}

function clear() {
    c.width = gui.width.value;
    c.height = gui.height.value;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.width, c.height);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(lastMousePos.x, lastMousePos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}
