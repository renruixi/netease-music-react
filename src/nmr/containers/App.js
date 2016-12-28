import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServiceClientP from "../service/ServiceClientP";

import PlayList from "../components/PlayList";
import TrackTable from "../components/TrackTable";
import { login } from '../actions/UserAction';
import { loadUserPlayLists, activeSelectedPlayList } from '../actions/PlayListAction';


class App extends Component {

    constructor(props) {
        super(props);
        console.log("App is running");

    }

    componentDidMount()
    {
        const userId = "78843035";
        const dispatch = this.props.dispatch;
        dispatch(login(userId));
        dispatch(loadUserPlayLists(userId));
    }

    render() {
        const {dispatch, userPlayLists, selectedPlayList} = this.props;
        return (
          <div className="nmr-app">
                <header>
                    <div className="logo"></div>
                    <h1>网易云音乐</h1>
                </header>
                <main>
                    <aside className="sidebar">
                        <PlayList
                            playlists={userPlayLists}
                            onPlayListClick={playlistId => dispatch(activeSelectedPlayList(playlistId))}
                        />
                    </aside>
                    <section className="content">
                        <TrackTable playlist={selectedPlayList} />
                    </section>
                </main>
                <footer></footer>
          </div>
        )
    }

}

function mapStateToProps(state) {
  return {
      userId: state.userId,
      userPlayLists: state.playlists,
      selectedPlayList: state.selectedPlayList
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps)(App);
