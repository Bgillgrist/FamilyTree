// Fetch the data for the specific person
fetch("people/" + window.location.search.substring(1) + ".json")
  .then(response => response.json())
  .then(data => {
    // Basic information
    document.getElementById("name").textContent = data.name;
    document.getElementById("birthdate").textContent = `Born: ${data.birthdate}`;
    document.getElementById("profile-pic").src = data.profilePicture;

    // Grouped family relationships
    const spouseList = document.getElementById("spouse");
    const parentsList = document.getElementById("parents");
    const siblingsList = document.getElementById("siblings");
    const childrenList = document.getElementById("children");

    // Loop through family and categorize
    data.family.forEach(member => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${member.link}">${member.name}</a>`;
      
      if (member.label === "Spouse") {
        spouseList.appendChild(li);
      } else if (member.label === "Parent") {
        parentsList.appendChild(li);
      } else if (member.label === "Sibling") {
        siblingsList.appendChild(li);
      } else if (member.label === "Child") {
        childrenList.appendChild(li);
      }
    });

    // Timeline
    const timelineList = document.getElementById("timeline");
    data.timeline.forEach(event => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${event.year}</strong> - ${event.description}`;
      timelineList.appendChild(li);
    });

    // Photo Gallery
    const gallery = document.getElementById("gallery");
    data.gallery.forEach(photo => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `<img src="${photo.src}" alt="${photo.alt}"><p>${photo.caption}</p>`;
      gallery.appendChild(div);
    });
  })
  .catch(error => console.error("Error loading data:", error));
