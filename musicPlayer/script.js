// 버튼 만들기

const previousButton = document.querySelector("#previous-button");
const pauseButton = document.querySelector("#pause-button");
const playButton = document.querySelector("#play-button");
const nextButton = document.querySelector("#next-button");
const shuffleButton = document.querySelector("#shuffle-button");

// player

// 전역변수
let clickedCnt = 0;
let previousSongArr = [];
let audioSource;
// songs 선택
const songListWrapper = document.querySelector(".playlist-songs");
const songLists = document.querySelectorAll(".playlist-song");
const copySongList = [...songLists];

const allSongs = [
  {
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/chasing-that-feeling.mp3",
  },
];

// clean 펑션
const cleanText = (str) => {
  let regexPattern = /^\s*[.\s]*|\s*[.\s]*$/g;
  if (regexPattern.test(str)) {
    const cleanStr = str.replace(regexPattern, "");
    return cleanStr;
  }
  return str;
};

const makeAudioObject = (songArr, songTitle, singerName) => {
  let audioSource;
  songArr.map((song) => {
    if (
      cleanText(song.title) === cleanText(songTitle) &&
      song.artist === singerName
    ) {
      audioSource = new Audio(song.src);
    }
  });
  return audioSource;
};

function playButtonFunction(songTitle, singerName) {
  // 이게 playlist에서 곡을 선택해서 재생할때
  if (typeof songTitle === "string" && typeof singerName === "string") {
    const svgTag = playButton.querySelector("svg");
    svgTag.style.fill = "#f1be32";

    audioSource = makeAudioObject(allSongs, songTitle, singerName);
    audioSource.play();

    const playerDisplay = document.querySelector(
      ".player-display .artist-display"
    );
    const displaySongTitle = playerDisplay.querySelector(".song-title");
    const displayArtistName = playerDisplay.querySelector(".artist-name");
    displaySongTitle.textContent = songTitle;
    displayArtistName.textContent = singerName;
  } else if (
    Object.prototype.toString
      .call(songTitle)
      .slice(8, -1)
      .replace(/\s/g, "") === "PointerEvent"
  ) {
    // 초기화일때 선택했을때!
    if (clickedCnt === 0) {
      const firstSong = songListWrapper.children[0];
      const firstSongTitle = firstSong.querySelector(
        ".playlist-song-title"
      ).textContent;

      const firstSongInArr = allSongs.find(
        (song) => song.title === firstSongTitle
      );

      clickedPlayListSong(firstSongInArr);
    } else {
      const [currentSong] = previousSongArr;

      const songTitle = currentSong.querySelector(
        ".playlist-song-title"
      ).textContent;
      const singerName = currentSong.querySelector(
        ".playlist-song-artist"
      ).textContent;

      // 새로운곡 play하기
      playButtonFunction(songTitle, singerName);
    }
  }
}

// pause펑션
function pauseButtonFunction() {
  const svgTag = playButton.querySelector("svg");
  svgTag.style.fill = "";
  if (audioSource) {
    audioSource.pause();
  }
}

// next버튼 펑션
let nextButtonIndex = 0;
let isNextButtonClicked = false;
function nextButtonFunction() {
  isNextButtonClicked = true;
  const allSongsCopy = [...allSongs];
  // player에서 next버튼을 처음 클릭했을때
  if (nextButtonIndex === 0 && previousSongArr.length === 0) {
    const firstSong = songListWrapper.children[nextButtonIndex];
    const firstSongTitle = firstSong.querySelector(
      ".playlist-song-title"
    ).textContent;

    const firstSongInArr = allSongsCopy.find(
      (song) => song.title === firstSongTitle
    );
    clickedPlayListSong(firstSongInArr);

    return;
  }

  if (previousSongArr.length > 0) {
    const song = previousSongArr[0];

    const currentSongIndex = Array.from(songListWrapper.children).indexOf(song);

    nextButtonIndex = currentSongIndex + 1;

    // 마지막 노래이면 끗
    if (nextButtonIndex === allSongsCopy.length) return;

    const nextSong = songListWrapper.children[nextButtonIndex];

    const NextSongTitle = nextSong.querySelector(
      ".playlist-song-title"
    ).textContent;
    const NextSingerName = nextSong.querySelector(
      ".playlist-song-artist"
    ).textContent;
    const NextSongInArr = allSongsCopy.find(
      (song) => song.title === NextSongTitle && song.artist === NextSingerName
    );
    clickedPlayListSong(NextSongInArr);
  }
}

// previous버튼 펑션
let previousButtonIndex = 0;
let isPreviousButtonClicked = false;
function previousButtonFunction() {
  isPreviousButtonClicked = true;
  const allSongsCopy = [...allSongs];

  // player에서 prev버튼을 처음 클릭했을때
  if (previousButtonIndex === 0 && previousSongArr.length === 0) {
    return;
  }
  if (previousSongArr.length > 0) {
    const song = previousSongArr[0];
    const currentSongIndex = Array.from(songListWrapper.children).indexOf(song);

    previousButtonIndex = currentSongIndex - 1;
    if (previousButtonIndex < 0) return;

    const previousSong = songListWrapper.children[previousButtonIndex];

    const PrevSongTitle = previousSong.querySelector(
      ".playlist-song-title"
    ).textContent;
    const PrevSingerName = previousSong.querySelector(
      ".playlist-song-artist"
    ).textContent;
    const PrevSongInArr = allSongsCopy.find(
      (song) => song.title === PrevSongTitle && song.artist === PrevSingerName
    );
    clickedPlayListSong(PrevSongInArr);
  }
}

// shuffle버튼기능

function shuffleButtonFunction() {
  for (i = songListWrapper.children.length; i >= 0; i--) {
    songListWrapper.appendChild(
      songListWrapper.children[(Math.random() * i) | 0]
    );
  }
}

// delete기능
function deleteSongFunction(deleteIdx) {
  if (songListWrapper.children.length) {
    const removedChildNode = songListWrapper.children[deleteIdx];
    audioSource.pause();
    songListWrapper.removeChild(removedChildNode);
  }

  if (songListWrapper.children.length === 0) {
    const resetButton = document.createElement("button");
    resetButton.className += "reset";
    resetButton.textContent = "Reset Playlist";
    songListWrapper.appendChild(resetButton);
  }

  const resetButton = document.querySelector(".reset");
  if (resetButton) {
    resetButton.addEventListener("click", resetButtonFunction);
  }
}

function resetButtonFunction() {
  const resetButton = document.querySelector(".reset");
  songListWrapper.removeChild(resetButton);
  for (let i = 0; i < copySongList.length; i++) {
    songListWrapper.appendChild(copySongList[i]);
  }
}

function clickedPlayListSong(clickedSong) {
  [...songLists].map((song) => {
    const songTitle = song.querySelector(".playlist-song-title").textContent;
    const singerName = song.querySelector(".playlist-song-artist").textContent;
    if (
      cleanText(clickedSong.title) === cleanText(songTitle) &&
      cleanText(clickedSong.artist) === cleanText(singerName)
    ) {
      clickedCnt += 1;
      previousSongArr.push(song);

      const [prevSong, currentSong] = previousSongArr;
      // next버튼클릭을 안한 경우
      if (!isNextButtonClicked) {
        // 첫번째로 선택했을때
        if (prevSong && !currentSong) {
          prevSong.style.backgroundColor = "#1b1b32";
          playButtonFunction(songTitle, singerName);
        }
        // 1곡 선택하고 나중에 선택했을때
        if (prevSong && currentSong) {
          audioSource.pause();
          prevSong.style.backgroundColor = "#3b3b4f";
          currentSong.style.backgroundColor = "#1b1b32";
          const songTitle = currentSong.querySelector(
            ".playlist-song-title"
          ).textContent;
          const singerName = currentSong.querySelector(
            ".playlist-song-artist"
          ).textContent;
          playButtonFunction(songTitle, singerName);
          previousSongArr.shift();
        }
      }

      // next버튼일때 함수작동..
      if (isNextButtonClicked) {
        if (prevSong && !currentSong) {
          prevSong.style.backgroundColor = "#1b1b32";
          playButtonFunction(songTitle, singerName);
        }
        if (prevSong && currentSong) {
          audioSource.pause();
          prevSong.style.backgroundColor = "#3b3b4f";
          currentSong.style.backgroundColor = "#1b1b32";
          const songTitle = currentSong.querySelector(
            ".playlist-song-title"
          ).textContent;
          const singerName = currentSong.querySelector(
            ".playlist-song-artist"
          ).textContent;
          playButtonFunction(songTitle, singerName);
          previousSongArr.shift();
        }
      }
    }
  });
}

function changeDomColor(clickedCnt, currentSong, prevSong) {
  if (clickedCnt === 1) {
    currentSong.style.backgroundColor = "#1b1b32";
  } else {
    prevSong.style.backgroundColor = "#3b3b4f";
    currentSong.style.backgroundColor = "#1b1b32";
  }
}

// playlist에서 재생하기

[...songLists].map((song) => {
  const deleteButton = song.querySelector(".playlist-song-delete");
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentSongIndex = Array.from(songListWrapper.children).indexOf(song);
    deleteSongFunction(currentSongIndex);
  });

  song.addEventListener("click", () => {
    clickedCnt += 1;
    previousSongArr.push(song);
    const songTitle = song.querySelector(".playlist-song-title").textContent;
    const singerName = song.querySelector(".playlist-song-artist").textContent;

    if (clickedCnt === 1) {
      changeDomColor(clickedCnt, song);
      playButtonFunction(songTitle, singerName);
    } else {
      // 현재 play되고 있는 노오래
      audioSource.pause();
      const [prevSong, currentSong] = previousSongArr;

      changeDomColor(clickedCnt, currentSong, prevSong);
      const songTitle = currentSong.querySelector(
        ".playlist-song-title"
      ).textContent;
      const singerName = currentSong.querySelector(
        ".playlist-song-artist"
      ).textContent;
      // 새로운곡 play하기
      playButtonFunction(songTitle, singerName);
      previousSongArr.shift();
    }
  });
});

playButton.addEventListener("click", playButtonFunction);

pauseButton.addEventListener("click", pauseButtonFunction);

nextButton.addEventListener("click", nextButtonFunction);

previousButton.addEventListener("click", previousButtonFunction);

shuffleButton.addEventListener("click", shuffleButtonFunction);
