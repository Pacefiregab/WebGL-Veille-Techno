"use strict";

var m = ThreeDMath;

function Cube() {
    //The cube vertices, defined as an array of x, y, z coordinates.
    var cubeVertices = [
        -1, -1, -1,
        1, -1, -1,
        1, 1, -1,
        -1, 1, -1,

        -1, -1, 1,
        1, -1, 1,
        1, 1, 1,
        -1, 1, 1,
    ];

    var indices = [
        0, 1,
        1, 2,
        2, 3,
        3, 0,
        4, 5,
        5, 6,
        6, 7,
        7, 4,
        0, 4,
        1, 5,
        2, 6,
        3, 7,
    ];

    //Initialize the WebGL context and the cube shader program.
    var canvas = document.getElementById("cubeCanvas");
    var gl = canvas.getContext("webgl");

    //Initialize the shaders and the vertex buffer.
    var program = webglUtils.createProgramFromScripts(
        gl, ["2d-vertex-shader", "2d-fragment-shader"]);
    gl.useProgram(program);

    //Get the location of the a_position attribute in the shader, and the u_worldViewProjection uniform in the shader.
    var positionLoc = gl.getAttribLocation(program, "a_position");
    var worldViewProjectionLoc =
        gl.getUniformLocation(program, "u_worldViewProjection");

    //Upload the data to the GPU
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(cubeVertices),
        gl.STATIC_DRAW);

    //Set the position of the vertices in the buffer array.
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    //Bind the buffer to the element array buffer (ELEMENT_ARRAY_BUFFER) array buffer. 
    //This is the buffer that will be used to draw the elements.
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    //initialize the buffer with the indices array
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW);

    //Render the scene with the current clock value
    function render(clock) {
        // Convert the elapsed time from milliseconds to seconds
        clock *= 0.001;

        // Resize the canvas to the display size (which is half the actual size)
        webglUtils.resizeCanvasToDisplaySize(gl.canvas, window.devicePixelRatio);

        // Set the viewport to cover the entire canvas
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas with the background color, which is black in this case
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Set up the projection matrix for the camera
        var fieldOfView = Math.PI * 0.25;
        var aspect = canvas.clientWidth / canvas.clientHeight;
        var projection = m.perspective(fieldOfView, aspect, 0.0001, 500);

        // Set up the view matrix for the camera
        var radius = 5;
        var eye = [
            Math.sin(clock) * radius,
            1,
            Math.cos(clock) * radius,
        ];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var view = m.lookAt(eye, target, up);

        // Multiply the view and projection matrices to get the world-view-projection matrix
        var worldViewProjection = m.multiplyMatrix(view, projection);

        // Set the world-view-projection matrix as the value of the "u_worldViewProjection" uniform
        gl.uniformMatrix4fv(worldViewProjectionLoc, false, worldViewProjection);

        // Draw the lines of the square using the indices
        gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);

        // Request the next frame of animation
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

function Square() {

    // Define the vertices of the square
    var squareVertices = [
        -1, -1, -1,
        1, -1, -1,
        1, 1, -1,
        -1, 1, -1,
    ];

    // Define the indices for the vertices to form the lines of the square
    var indices = [
        0, 1,
        1, 2,
        2, 3,
        3, 0,
    ];

    // Get the canvas element and the WebGL context
    var canvas = document.getElementById("squareCanvas");
    var gl = canvas.getContext("webgl");

    // If the WebGL context is not available, display an alert
    if (!gl) {
        alert("no webgl");
        return;
    }

    // Create a program from the vertex and fragment shader scripts
    var program = webglUtils.createProgramFromScripts(
        gl, ["2d-vertex-shader", "2d-fragment-shader"]);

    // Use the created program
    gl.useProgram(program);

    // Get the locations of the "a_position" attribute and the "u_worldViewProjection" uniform
    var positionLoc = gl.getAttribLocation(program, "a_position");
    var worldViewProjectionLoc =
        gl.getUniformLocation(program, "u_worldViewProjection");

    // Create a buffer for the square vertices and bind it to the ARRAY_BUFFER
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // Store the square vertices in the buffer and set up the position attribute
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(squareVertices),
        gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    // Create a buffer for the indices and bind it to the ELEMENT_ARRAY_BUFFER
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);

    // Store the indices in the buffer
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW);

    function render() {
        // Resize the canvas to match the display size and set the viewport
        webglUtils.resizeCanvasToDisplaySize(gl.canvas, window.devicePixelRatio);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the color buffer
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Set up the projection matrix
        var fieldOfView = Math.PI * 0.25;
        var aspect = canvas.clientWidth / canvas.clientHeight;
        var projection = m.perspective(fieldOfView, aspect, 0.0001, 500);

        // Set up the view matrix
        var radius = 4;
        var eye = [
            0,
            0,
            -radius,
        ];
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var view = m.lookAt(eye, target, up);

        // Multiply the view and projection matrices to get the world-view-projection matrix
        var worldViewProjection = m.multiplyMatrix(view, projection);

        // Set the world-view-projection matrix as the value of the "u_worldViewProjection" uniform
        gl.uniformMatrix4fv(worldViewProjectionLoc, false, worldViewProjection);

        // Draw the lines of the square using the indices
        gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    render();
}

function start() {
    Square()
    Cube();

}

