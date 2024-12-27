async function loadFamilyTree() {
  // Fetch people.json
  const response = await fetch("people.json");
  const data = await response.json();

  // Map people by ID for quick lookup
  const peopleById = Object.fromEntries(data.map(person => [person.id, person]));

  // Build the hierarchical structure
  function buildTree(person) {
    return {
      name: person.name,
      id: person.id,
      birthday: person.birthday,
      children: (person.family.children || [])
        .map(child => peopleById[child.id])
        .filter(Boolean)
        .map(buildTree)
    };
  }

  // Find the root person (no parents in data)
  const root = data.find(person => person.family.parents.length === 0);
  const hierarchy = buildTree(root);

  // Create the tree visualization
  drawTree(hierarchy);
}

function drawTree(root) {
  const width = 1000;
  const height = 600;

  const svg = d3
    .select("#tree")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,50)");

  const treeLayout = d3.tree().size([height - 100, width - 200]);
  const rootHierarchy = d3.hierarchy(root);

  treeLayout(rootHierarchy);

  // Add links
  svg
    .selectAll(".link")
    .data(rootHierarchy.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
    );

  // Add nodes
  const nodes = svg
    .selectAll(".node")
    .data(rootHierarchy.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  nodes.append("circle").attr("r", 5);

  nodes
    .append("text")
    .attr("dx", 10)
    .attr("dy", 3)
    .text(d => d.data.name);
}

// Load the tree on page load
loadFamilyTree();
