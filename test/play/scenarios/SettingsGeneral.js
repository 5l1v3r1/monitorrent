import Vuex from 'vuex'
import { play } from 'vue-play'
import SettingsGeneral from '../../../src/components/Settings/SettingsGeneral'

const fullSettings = {
    updateInterval: 123,
    proxy: {
        enabled: true,
        http: 'http://login:password@proxy.local:8888',
        https: 'https://login:password@proxy.local:8888'
    },
    newVersionCheck: {
        enabled: true,
        preRelease: false,
        interval: 67
    }
}

const partialSettings = {
    updateInterval: 321,
    proxy: {
        enabled: false,
        http: null,
        https: 'https://login:password@proxy.local:8888'
    },
    newVersionCheck: {
        enabled: true,
        preRelease: true,
        interval: 54
    }
}

const log = (msg) => log.log(msg)
log.log = () => {}

function createSettings (loading, settings) {
    return {
        state: {
            loading: true,
            settings: null
        },
        actions: {
            loadSettings ({ commit }) {
                log('loadSettings')
                commit('SET_SETTINGS', settings)
            },
            setUpdateInterval ({ commit }, value) {
                log(`setUpdateInterval = ${value}`)
                commit('SET_UPDATE_INTERVAL', { value })
            },
            setProxyEnabled ({ commit }, value) {
                log(`setProxyEnabled = ${value}`)
                commit('SET_PROXY_ENABLED', { value })
            },
            setProxy ({ commit }, params) {
                log(`setProxy ${params.type} = ${params.value}`)
                commit('SET_PROXY', params)
            },
            setNewVersionCheckEnabled ({ commit }, value) {
                log(`setNewVersionCheckEnabled = ${value}`)
                commit('SET_NEW_VERSION_CHECKED_ENABLED', { value })
            },
            setNewVersionCheckIncludePrerelease ({ commit }, value) {
                log(`setNewVersionCheckIncludePrerelease = ${value}`)
                commit('SET_NEW_VERSION_CHECKED_INCLUDE_PRERELEASE', { value })
            },
            setNewVersionCheckInterval ({ commit }, value) {
                log(`setNewVersionCheckInterval = ${value}`)
                commit('SET_NEW_VERSION_CHECKED_INTERVAL', { value })
            }
        },
        mutations: {
            'SET_SETTINGS' (state, settings) {
                state.loading = false
                state.settings = settings
            },
            'SET_UPDATE_INTERVAL' (state, { value }) {
                state.updateInterval = value
            },
            'SET_PROXY_ENABLED' (state, { value }) {
                state.settings.proxy.enabled = value
            },
            'SET_PROXY' (state, { type, value }) {
                state.settings.proxy[type] = value
            },
            'SET_NEW_VERSION_CHECKED_ENABLED' (state, { value }) {
                state.settings.newVersionCheck.enabled = value
            },
            'SET_NEW_VERSION_CHECKED_INCLUDE_PRERELEASE' (state, { value }) {
                state.settings.newVersionCheck.preRelease = value
            },
            'SET_NEW_VERSION_CHECKED_INTERVAL' (state, { value }) {
                state.settings.newVersionCheck.interval = value
            }
        }
    }
}

function createStoreOptions (loading, settings) {
    return {
        modules: {
            settings: createSettings(loading, settings)
        }
    }
}

const createStore = (loading, settings) => new Vuex.Store(createStoreOptions(loading, settings))

function createPlay (loading, settings) {
    return {
        store: createStore(loading, settings),
        render: function (h) {
            log.log = this.$log
            return <md-whiteframe md-elevation="5" style="margin: auto; width: 1168px"><SettingsGeneral/></md-whiteframe>
        }
    }
}

play(SettingsGeneral)
    .add('loading', createPlay(true, null))
    .add('partial settings', createPlay(false, partialSettings))
    .add('full settings', createPlay(false, fullSettings))
