import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlaylitStore = defineStore('playlist', () => {
  const playlistItems = ref([])
  const playlistName = ref('')
  const videoCount = ref(0)
  const unavailableVideoCount = ref(0)
  const orderByProperty = ref('position')
  const orderDirection = ref('ascending')
  const playlistLoading = ref('')

  function $reset() {
    playlistItems.value = []
    playlistName.value = ''
    videoCount.value = 0
    unavailableVideoCount.value = 0
    orderByProperty.value = 'position'
    orderDirection.value = 'ascending'
    playlistLoading.value = ''
  }

  const orderedPlaylist = computed(() => {
    if (!playlistItems.value.length) return []

    return playlistItems.value.sort((a, b) => {
      let aElement = a[orderByProperty.value]
      let bElement = b[orderByProperty.value]

      if (
        orderByProperty.value !== 'position' &&
        orderByProperty.value !== 'addedAt'
      ) {
        if (
          (a['title'].toLowerCase() === 'private video' &&
            b['title'].toLowerCase() === 'private video') ||
          (a['title'].toLowerCase() === 'deleted video' &&
            b['title'].toLowerCase() === 'deleted video')
        )
          return 0
        if (
          a['title'].toLowerCase() === 'private video' &&
          b['title'].toLowerCase() === 'deleted video'
        )
          return orderDirection.value === 'ascending' ? 1 : -1
        if (
          a['title'].toLowerCase() === 'deleted video' &&
          b['title'].toLowerCase() === 'private video'
        )
          return orderDirection.value === 'ascending' ? -1 : 1
        if (
          a['title'].toLowerCase() === 'private video' ||
          a['title'].toLowerCase() === 'deleted video'
        )
          return orderDirection.value === 'ascending' ? 1 : -1
        if (
          b['title'].toLowerCase() === 'private video' ||
          b['title'].toLowerCase() === 'deleted video'
        )
          return orderDirection.value === 'ascending' ? -1 : 1
      }

      if (
        orderByProperty.value === 'addedAt' ||
        orderByProperty.value === 'uploadedAt'
      ) {
        aElement = new Date(aElement).getTime()
        bElement = new Date(bElement).getTime()
      } else if (orderByProperty.value !== 'position') {
        aElement = aElement.toLowerCase()
        bElement = bElement.toLowerCase()
      }

      if (aElement < bElement) {
        return orderDirection.value === 'ascending' ? -1 : 1
      }
      if (aElement > bElement) {
        return orderDirection.value === 'ascending' ? 1 : -1
      }
      return 0
    })
  })

  function mapPlaylist() {
    if (!playlistItems.value.length) return playlistItems.value
    console.log('map playlist')
    playlistItems.value = playlistItems.value.map((playlistItem) => {
      if (
        playlistItem?.snippet?.title === 'Private video' ||
        playlistItem?.snippet?.title === 'Deleted video'
      )
        unavailableVideoCount.value++
      return {
        position: playlistItem?.snippet?.position + 1,
        title: playlistItem?.snippet?.title,
        description: playlistItem?.snippet?.description,
        videoId: playlistItem?.snippet?.resourceId?.videoId,
        thumbnail: playlistItem?.snippet?.thumbnails?.medium?.url,
        addedAt: playlistItem?.snippet?.publishedAt,
        uploadedAt: playlistItem?.contentDetails?.videoPublishedAt,
      }
    })
  }

  async function getPlaylist(playlistLink) {
    const playlistId = playlistLink.match(/(?:.*(?:list=))?(.{18,34})/)[1]

    if (!playlistId) return console.log('no playlist id')
    if (playlistLoading.value === 'loading')
      return console.log('already fetching playlist')

    getPlaylistItems(playlistId)
    getPlaylistName(playlistId)
  }

  async function getPlaylistItems(playlistId) {
    const apiKey = 'AIzaSyCKHytj5BTTR324N9R4NXnud41v1vhYwiw'
    const fetchUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet%2CcontentDetails&maxResults=1000&fields=nextPageToken,items(snippet(title,position,description,resourceId(videoId),thumbnails(medium(url)),publishedAt),contentDetails(videoPublishedAt))`
    playlistItems.value = []
    playlistLoading.value = 'loading'

    console.log('start fetching data')

    await fetchData(fetchUrl).then((response) => {
      // console.log('response')
      // console.log(response)
      // console.log('data fetched!')
      // console.log(playlistItems.value)
    })
  }

  async function fetchData(url) {
    console.log('fetching')
    // return fetch(url)
    const fetchResponse = await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log('fetched')
        console.log(json)
        if (!json.items) return playlistItems.value

        playlistItems.value.push(...json.items)

        if (json.nextPageToken) {
          fetchData(`${url}&pageToken=${json.nextPageToken}`)
        } else {
          console.log('all items fetched')
          videoCount.value = playlistItems.value.length
          mapPlaylist()
          playlistLoading.value = 'loaded'
        }
      })

    return fetchResponse
  }

  async function getPlaylistName(playlistId) {
    const apiKey = 'AIzaSyCKHytj5BTTR324N9R4NXnud41v1vhYwiw'
    const url = `https://www.googleapis.com/youtube/v3/playlists?key=${apiKey}&id=${playlistId}&part=snippet&fields=items(snippet(title))`

    await fetch(url)
      .then((response) => response.json())
      .then((json) => {
        playlistName.value = json.items[0].snippet.title
      })
  }

  async function exportPlaylist() {
    if (!playlistItems.value.length) return console.log('nothing to export!')

    const fileName = `Youtube_Playlist_${
      playlistName.value
    }_${new Date().toLocaleString('en-GB')}.xlsx`
    const worksheet = XLSX.utils.json_to_sheet(playlistItems.value)
    const workbook = XLSX.utils.book_new()
    worksheet['!cols'] = [
      { wch: 8 },
      { wch: 70 },
      { wch: 50 },
      { wch: 15 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
    ]
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          'Position',
          'Title',
          'Description',
          'Video ID',
          'Thumbnail',
          'Date Added',
          'Date Uploaded',
        ],
      ],
      { origin: 'A1' }
    )
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Videos')
    XLSX.writeFile(workbook, fileName, { compression: true })
  }

  return {
    playlistName,
    playlistItems,
    videoCount,
    unavailableVideoCount,
    orderByProperty,
    orderDirection,
    orderedPlaylist,
    playlistLoading,
    $reset,
    mapPlaylist,
    getPlaylist,
    exportPlaylist,
  }
})
