// Fetch the data for the specific person
fetch(window.location.search.substring(1) + ".json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("name").textContent = data.name;
    document.getElementById("birthdate").textContent = `Born: ${data.birthdate}`;

    // Profile Picture
    document.getElementById("profile-pic").src = data.profilePicture;

    // Family Relationships
    const familyList = document.getElementById("family");
    data.family.forEach(member => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${member.label}:</strong> <a href="${member.link}">${member.name}</a>`;
      familyList.appendChild(li);
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
