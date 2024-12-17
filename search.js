const familyMembers = [
  { name: "Brennan Gillgrist", link: "brennan2002/index.html" },
  { name: "Theodore Gillgrist", link: "theodore1971/index.html" },
  { name: "Ethan Gillgrist", link: "ethan2005/index.html" },
  { name: "Karen Gillgrist", link: "karen1974/index.html" },
  { name: "Kaitlyn Gillgrist", link: "kaitlyn2000/index.html" },
  // Add more family members here
];

const searchInput = document.getElementById("search");
const results = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  results.innerHTML = "";

  const filtered = familyMembers.filter(member =>
    member.name.toLowerCase().includes(query)
  );

  filtered.forEach(member => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = member.link;
    a.textContent = member.name;
    li.appendChild(a);
    results.appendChild(li);
  });
});
