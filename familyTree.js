// Set up the SVG canvas dimensions
const width = 800;
const height = 600;

// Create the SVG container
const svg = d3
  .select("#tree")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50, 50)");

// Create a tree layout
const treeLayout = d3.tree().size([height - 100, width - 100]);

// Fetch and render family tree data
async function renderFamilyTree() {
  try {
    // Load family tree data from the JSON file
    const familyData = await d3.json("people.json");

    // Convert data into a hierarchy
    const root = d3.hierarchy(familyData);

    // Generate tree layout
    const treeData = treeLayout(root);

    // Add links (lines) between nodes
    svg
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    // Add nodes (circles) and labels
    const nodes = svg
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y}, ${d.x})`);

    // Add circles to nodes
    nodes
      .append("circle")
      .attr("r", 5)
      .attr("fill", "steelblue");

    // Add text labels to nodes
    nodes
      .append("text")
      .attr("dy", -10)
      .attr("x", (d) => (d.children ? -10 : 10))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name);
  } catch (error) {
    console.error("Error loading family tree data:", error);
  }
}

// Render the family tree when the page loads
renderFamilyTree();
