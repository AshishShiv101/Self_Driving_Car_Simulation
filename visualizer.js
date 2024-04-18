class Visualizer {
    static drawNetwork(ctx, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const height = ctx.canvas.height - margin * 2;

        const levelHeight = height / network.levels.length;

        for (let i = network.levels.length - 1; i >= 0; i--) {
            const levelTop = top +
                lerp(
                    height - levelHeight,
                    0,
                    network.levels.length == 1
                        ? 0.5
                        : i / (network.levels.length - 1)
                );

            ctx.setLineDash([7, 3]);
            Visualizer.drawLevel(ctx, network.levels[i],
                left, levelTop,
                width, levelHeight,
                i == network.levels.length - 1
                    ? ['🠉', '🠈', '🠊', '🠋']
                    : []
            );
        }
    }

static drawLevel(ctx, level, left, top, width, height, outputLabels) {
    const right = left + width;
    const bottom = top + height;

    const { inputs, outputs, weights, biases } = level;
    const nodeRadius = 14;

    // Draw connections between input and output nodes
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)"; // Set the stroke color for connections
    ctx.lineWidth = 2; // Set the line width for connections
    for (let i = 0; i < inputs.length; i++) {
        const startX = Visualizer.getNodeX(inputs, i, left, right);
        for (let j = 0; j < outputs.length; j++) {
            const endX = Visualizer.getNodeX(outputs, j, left, right);
            ctx.beginPath();
            ctx.moveTo(startX, bottom); // Start from the bottom of input node
            ctx.lineTo(endX, top); // End at the top of output node
            ctx.stroke();
        }
    }

    // Draw input nodes
    for (let i = 0; i < inputs.length; i++) {
        const x = Visualizer.getNodeX(inputs, i, left, right);
        ctx.beginPath();
        ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, bottom, nodeRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = Visualizer.getRGBA("yellow"); // Set input node color to yellow
        ctx.fill();
    }

    // Draw output nodes
    for (let i = 0; i < outputs.length; i++) {
        const x = Visualizer.getNodeX(outputs, i, left, right);
        ctx.beginPath();
        ctx.arc(x, top, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = Visualizer.getRGBA("yellow"); // Set output node color to yellow
        ctx.fill();
        ctx.beginPath();
        ctx.lineWidth = 2; // Increase the line width for biases
        ctx.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = Visualizer.getRGBA(biases[i]);
        ctx.stroke();
        if (outputLabels[i]) {
            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";
            ctx.font = (nodeRadius * 1.5) + "px Arial";
            ctx.fillText(outputLabels[i], x, top + nodeRadius * 0.1);
            ctx.lineWidth = 0.5;
            ctx.strokeText(outputLabels[i], x, top + nodeRadius * 0.1);
        }
    }
}




    static getNodeX(nodes, index, left, right) {
        return lerp(
            left,
            right,
            nodes.length == 1
                ? 0.5
                : index / (nodes.length - 1)
        );
    }

    static getRGBA(value) {
        if (value === "yellow") {
            return "yellow";
        } else {
            return "black";
        }
    }
}
