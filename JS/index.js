


function SendMail() {
    let name = document.getElementById('name').value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById('subject').value;
    let body = document.getElementById("body").value;
    let syntax = "Hi,Sachin Kinha\nMy name is : " + name +
        "\nPurpose of meeting : " + subject +
        "\n\n" + body;
    body += window.location.email;
    body += ">";
    var uri = "mailto:" + email + "?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(syntax);
    window.open(uri);
}

//array of colors

const color_array = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

// set up the canvas and context
var canvas = document.createElement("canvas");
document.getElementById('section3').appendChild(canvas);
var ctx = canvas.getContext("2d");


setInterval(function () {
    const items_index = Math.floor(Math.random() * color_array.length);
    const COLOR_BG = "rgb(223, 219, 219)";
    let COLOR_CUBE = color_array[items_index];
    const SPEED_X = 0.05; // rps
    const SPEED_Y = 0.15; // rps
    const SPEED_Z = 0.10; // rps
    const POINT3D = function (x, y, z) { this.x = x; this.y = y; this.z = z; };



    // dimensions
    var h = document.documentElement.clientHeight;
    var w = document.documentElement.clientWidth;
    canvas.height = h;
    canvas.width = w;

    // colours and lines
    ctx.fillStyle = COLOR_BG;
    ctx.strokeStyle = COLOR_CUBE;
    ctx.lineWidth = w / 100;
    ctx.lineCap = "round";

    // cube parameters
    var cx = w / 2;
    var cy = h / 2;
    var cz = 0;
    var size = h / 1;
    var vertices = [
        new POINT3D(cx - size, cy - size, cz - size),
        new POINT3D(cx + size, cy - size, cz - size),
        new POINT3D(cx + size, cy + size, cz - size),
        new POINT3D(cx - size, cy + size, cz - size),
        new POINT3D(cx - size, cy - size, cz + size),
        new POINT3D(cx + size, cy - size, cz + size),
        new POINT3D(cx + size, cy + size, cz + size),
        new POINT3D(cx - size, cy + size, cz + size)
    ];
    var edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // back face
        [4, 5], [5, 6], [6, 7], [7, 4], // front face
        [0, 4], [1, 5], [2, 6], [3, 7] // connecting sides
    ];

    // set up the animation loop
    var timeDelta, timeLast = 0;
    requestAnimationFrame(loop);

    function loop(timeNow) {

        // calculate the time difference
        timeDelta = timeNow - timeLast;
        timeLast = timeNow;

        // background
        ctx.fillRect(0, 0, w, h);

        // rotate the cube along the z axis
        let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
        for (let v of vertices) {
            let dx = v.x - cx;
            let dy = v.y - cy;
            let x = dx * Math.cos(angle) - dy * Math.sin(angle);
            let y = dx * Math.sin(angle) + dy * Math.cos(angle);
            v.x = x + cx;
            v.y = y + cy;
        }

        // rotate the cube along the x axis
        angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
        for (let v of vertices) {
            let dy = v.y - cy;
            let dz = v.z - cz;
            let y = dy * Math.cos(angle) - dz * Math.sin(angle);
            let z = dy * Math.sin(angle) + dz * Math.cos(angle);
            v.y = y + cy;
            v.z = z + cz;
        }

        // rotate the cube along the y axis
        angle = timeDelta * 0.001 * SPEED_Y * Math.PI * 2;
        for (let v of vertices) {
            let dx = v.x - cx;
            let dz = v.z - cz;
            let x = dz * Math.sin(angle) + dx * Math.cos(angle);
            let z = dz * Math.cos(angle) - dx * Math.sin(angle);
            v.x = x + cx;
            v.z = z + cz;
        }

        // draw each edge
        for (let edge of edges) {
            ctx.beginPath();
            ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
            ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
            ctx.stroke();
        }

        // call the next frame
        requestAnimationFrame(loop);
    }
}, 2000);

