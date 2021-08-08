import { ActionTree } from 'vuex'
import { RootState } from '@/types/store'
import { PLAY_MODE } from '@/utils/constant'
import { shuffle } from '@/utils/util'
import { Song } from '@/types/singer'

const actions: ActionTree<RootState, RootState> = {
  selectPlay({ commit }, { list, index }: { list: Song[]; index: number }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlaylist', list)
    commit('setCurrentIndex', index)
  },

  randomPlay({ commit }, list: Song[]) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
    commit('setPlaylist', shuffle(list))
    commit('setCurrentIndex', 0)
  },

  changeMode({ commit, state, getters }, mode: PLAY_MODE) {
    const currentId = getters.currentSong.id
    if (mode === PLAY_MODE.random) {
      commit('setPlaylist', shuffle(state.sequenceList))
    } else {
      commit('setPlaylist', state.sequenceList)
    }
    const index = state.playlist.findIndex((song) => {
      return song.id === currentId
    })

    commit('setCurrentIndex', index)
    commit('setPlayMode', mode)
  },

  removeSong({ commit, state }, song: Song) {
    const sequenceList = state.sequenceList.slice()
    const playlist = state.playlist.slice()

    const sequenceIndex = findIndex(sequenceList, song)
    const playIndex = findIndex(playlist, song)
    if (sequenceIndex < 0 || playIndex < 0) {
      return
    }

    sequenceList.splice(sequenceIndex, 1)
    playlist.splice(playIndex, 1)

    let currentIndex = state.currentIndex
    if (playIndex < currentIndex || currentIndex === playlist.length) {
      currentIndex--
    }

    commit('setSequenceList', sequenceList)
    commit('setPlaylist', playlist)
    commit('setCurrentIndex', currentIndex)
    if (!playlist.length) {
      commit('setPlayingState', false)
    }
  },

  clearSongList({ commit }) {
    commit('setSequenceList', [])
    commit('setPlaylist', [])
    commit('setCurrentIndex', 0)
    commit('setPlayingState', false)
  },

  addSong({ commit, state }, song: Song) {
    const playlist = state.playlist.slice()
    const sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    const playIndex = findIndex(playlist, song)

    if (playIndex > -1) {
      currentIndex = playIndex
    } else {
      playlist.push(song)
      currentIndex = playlist.length - 1
    }

    const sequenceIndex = findIndex(sequenceList, song)
    if (sequenceIndex === -1) {
      sequenceList.push(song)
    }

    commit('setSequenceList', sequenceList)
    commit('setPlaylist', playlist)
    commit('setCurrentIndex', currentIndex)
    commit('setPlayingState', true)
    commit('setFullScreen', true)
  },
}

function findIndex(list: Song[], song: Song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export default actions
