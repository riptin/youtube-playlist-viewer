window.addEventListener('load', () => {
  const resultContainer = document.querySelector(".results");
  const playlistInputField = document.querySelector("#playlist-id-input");
  const viewPlaylistBtn = document.querySelector("#view-playlist-button");
  const exportPlaylistBtn = document.querySelector("#export-playlist-button");
  const playlistNameContainer = document.querySelector(".playlist-name");
  const apiKey = 'AIzaSyCKHytj5BTTR324N9R4NXnud41v1vhYwiw';
  let playlistItems = [];
  let playlistName = '';

    // TODO
    // Why doesn't await wait??
    // sorting by attributes
    // clear results on new search
    // sticky headers
    //  highlight unavailable
    // thumbnails in image tags
    // handle playlist id and url
  

  async function getPlaylistItems(playlistId) {
    if (!playlistId) return console.log('no playlist id');
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet%2CcontentDetails&maxResults=800&fields=nextPageToken,items(snippet(title,position,description,resourceId(videoId),thumbnails(medium(url)),publishedAt),contentDetails(videoPublishedAt))`;
    playlistItems = [];
  
    await fetchItems(url);
  }

  async function getPlaylistName(playlistId) {
    if (!playlistId) return;
    const url = `https://www.googleapis.com/youtube/v3/playlists?key=${apiKey}&id=${playlistId}&part=snippet&fields=items(snippet(title))`
  
    await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        playlistName = json.items[0].snippet.title;
        playlistNameContainer.innerText = playlistName;
      });
  }

  async function fetchItems(url) {
    return await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!json.items) return playlistItems;

        playlistItems.push(...json.items);

        if (json.nextPageToken) {
          fetchItems(`${url}&pageToken=${json.nextPageToken}`);
        } else {
          playlistItems = playlistItems.map(playlistItem => {
            return {
              position:     playlistItem?.snippet?.position + 1,
              title:        playlistItem?.snippet?.title,
              description:  playlistItem?.snippet?.description,
              videoId:      playlistItem?.snippet?.resourceId?.videoId,
              thumbnail:    playlistItem?.snippet?.thumbnails?.medium?.url,
              addedAt:      formatDate(playlistItem?.snippet?.publishedAt),
              uploadedAt:   formatDate(playlistItem?.contentDetails?.videoPublishedAt)
            }
          });

          renedrPlaylistItems(playlistItems);
        }
      });
  }

  function renedrPlaylistItems(playlistItems) {
    if (!playlistItems) return console.log('no playlist items');

    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }

    playlistItems.forEach((playlistItem) => {
      playlistItemElement = document.createElement("div");
      playlistItemElement.classList.add('single-result');
      playlistItemElement.innerHTML = `
      <div class="cell video-position"><div class="value">${playlistItem.position}</div></div>
      <div class="cell video-title"><div class="value">${playlistItem.title}</div></div>
      <div class="cell video-description"><div class="value">${playlistItem.description}</div></div>
      <div class="cell video-thumbnail"><div class="value" style="background-image:url('${playlistItem.thumbnail}')"></div></div>
      <div class="cell video-id" ><div class="value">
        <a target="_blank" href="https://www.youtube.com/watch?v=${playlistItem.videoId}">${playlistItem.videoId}</a>
      </div></div>
      <div class="cell video-add-date"><div class="value">${playlistItem.addedAt}</div></div>
      <div class="cell video-upload-date"><div class="value">${playlistItem.uploadedAt}</div></div>
    `;
    
      resultContainer.appendChild(playlistItemElement);
    });
  }

  function exportPlaylist(playlistItems) {
    if (!playlistItems.length) return console.log('nothing to export!');

    const fileName = `Youtube_Playlist_${playlistName}_${formatDate(new Date())}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(playlistItems);
    const workbook = XLSX.utils.book_new();
    worksheet["!cols"] = [
      { wch: 8 },
      { wch: 70 },
      { wch: 50 },
      { wch: 15 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
    ];
    XLSX.utils.sheet_add_aoa(worksheet, [["Position", "Title", "Description", "Video ID", "Thumbnail", "Date Added", "Date Uploaded"]], { origin: "A1" });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Videos");
    XLSX.writeFile(workbook, fileName, { compression: true });
  }

  function formatDate(date) {
    if (!date || date === 'undefined') return 'N/A';

    const dateObj = new Date(Date.parse(date));
    return `${dateObj.getDate().toString().padStart(2, '0')}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getFullYear()} ${dateObj.getHours().toString().padStart(2, '0')}-${dateObj.getMinutes().toString().padStart(2, '0')}`;
  }

  viewPlaylistBtn.addEventListener('click', () => {
      getPlaylistItems(playlistInputField.value);
      getPlaylistName(playlistInputField.value);
  });

  exportPlaylistBtn.addEventListener('click', () => {
      exportPlaylist(playlistItems);
  });

});