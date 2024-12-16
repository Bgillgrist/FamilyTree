const familyMembers = [
  { name: "Brennan Gillgrist", link: "brennan2002/index.html" },
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