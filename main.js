var c, ctx, down, lastMousePos, mousePos;

// Gui elements
gui = {}

window.onload = function() {
    c = document.getElementById('canvas');
    ctx = c.getContext('2d');

    gui = {
        width: document.getElementById('width'),
        height: document.getElementById('height')
    };

    c.width = 800;
    c.height = 600;

    clear();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    document.addEventListener('mousedown', function(e) {
        down = true;
    });

    document.addEventListener('mouseup', function(e) {
        down = false;
    });

    document.addEventListener('mousemove', function(e) {
        var rect = c.getBoundingClientRect();
        lastMousePos = mousePos;
        mousePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        if (down) {
            draw();
        }
    });

    document.getElementById('clear').addEventListener('click', function(e) {
        clear();
    });

}

function clear() {
    console.log("hi");
    c.width = gui.width.value;
    c.height = gui.height.value;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.width, c.height);
}

function draw() {
    ctx.moveTo(lastMousePos.x, lastMousePos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}
