import React, { PureComponent } from 'react'
import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import NewsActions from '../Redux/NewsRedux'
import LikeActions from '../Redux/LikeRedux'

import NewsItem from '../Components/NewsItem'

import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/MainScreenStyle'
import { Colors } from '../Themes';

class MainScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      headlines: [],
      newsPages: 1,
      headlinesPages: 1,
      isRefreshing: false
    }
    this._render = this._render.bind(this)
    this.fetchNews = this.fetchNews.bind(this)
    this.fetchHeadlines = this.fetchHeadlines.bind(this)
    this._onReachEnd = this._onReachEnd.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
    this.onPressItem = this.onPressItem.bind(this)
    this.onPressLike = this.onPressLike.bind(this)
    this.renderHeadlines = this.renderHeadlines.bind(this)
    this.checkLiked = this.checkLiked.bind(this)
    
    this.isRenderHeadlines = false
  }
  
  componentDidMount() {
    this.fetchNews()
    this.fetchHeadlines()
  }

  fetchNews(page = 1) {
    const newsParams = {
      sources: 'cnn',
      sortBy: 'popularity',
      pageSize: 10,
      page
    }

    this.props.getNews(newsParams)
  }

  fetchHeadlines(page = 1) {
    const headlinesParams = {
      category: 'general',
      sortBy: 'popularity',
      pageSize: 10,
      page
    }

    this.props.getHeadlines(headlinesParams)
  }

  componentWillReceiveProps (nextProps) {
    const {news, headlines} = nextProps
    let params = null

    if (!news.fetching) {

      params = {
        isRefreshing: false
      }

      if (news.error === null) {
        params = {
          ...params,
          news: news.payload.articles,
          newsPages: this.state.newsPages + 1
        }
      }
    }
    
    if (news.fetching) {
      params = {
        isRefreshing: false
      }
    }

    if (!headlines.fetching && headlines.error === null) {

      if (headlines.error === null) {
        params = {
          ...params,
          headlines: headlines.payload.articles,
          headlinesPages: this.state.headlinesPages + 1
        }
      }
    }

    if (params) {
      this.setState({
        ...params
      })
    }
  }

  _keyExtractor = (item, index) => {
    if (index === 1) {
      this.isRenderHeadlines = true
    } else {
      this.isRenderHeadlines = false
    }
    return index.toString();
  }

  onPressItem (item) {
    const {navigate} = this.props.navigation
    navigate('NewsDetailScreen', {...item})
  }

  onPressLike (type, item) {
    if (type === 'news') {
      this.props.likeNews(item.url)
    } else {
      this.props.likeHeadlines(item.url)
    }
  }

  checkLiked (type, item) {
    if (type === 'news') {
      return this.props.likedNews.includes(item.url)
    } else {
      return this.props.likedHeadlines.includes(item.url)
    }
  }

  _render ({item, index}, type = 'news') {
    if (type === 'news') {
      if ((index + 1) % 5 === 0) {
        this.isRenderHeadlines = true
      } else {
        this.isRenderHeadlines = false
      }
    }
    return(
      <TouchableOpacity onPress={() => this.onPressItem(item)}>
        <NewsItem data={item} onPressLike={() => this.onPressLike(type, item)} isLike={this.checkLiked(type, item)} type={type} />
      </TouchableOpacity>
    )
  }

  _onReachEnd (type) {
    if (type === 'news') {
      const {payload} = this.props.news
      if (payload) {
        if (this.state.news.length <= payload.totalResults) {
          this.fetchNews(this.state.newsPages)
        }
      }
    } else {
      const {payload} = this.props.headlines
      if (payload) {
        if (this.state.headlines.length <= payload.totalResults) {
          this.fetchHeadlines(this.state.headlinesPages)
        }
      }
    }
  }

  _onRefresh (type) {
    this.setState({
      newsPages: 1,
      headlinesPages: 1
    })
    this.fetchNews()
    this.fetchHeadlines()
  }

  renderHeadlines () {
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Icon
            name={'check-circle'}
            color={Colors.primary}
            size={25}
          />
          <Text style={{textAlign: 'right'}}>HEADLINE NEWS!</Text>
        </View>
        <FlatList
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={this.props.likedHeadlines}
          data={this.state.headlines}
          keyExtractor={this._keyExtractor}
          renderItem={(item) => this._render(item, 'headlines')}
          onEndReached={() => this._onReachEnd('headlines')}
        />
      </View>
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          extraData={this.props.likedNews}
          data={this.state.news}
          keyExtractor={this._keyExtractor}
          renderItem={this._render}
          onEndReached={() => this._onReachEnd('news')}
          onRefresh={this._onRefresh}
          refreshing={this.state.isRefreshing}
          ItemSeparatorComponent={() => this.isRenderHeadlines ? this.renderHeadlines() : null}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
    headlines: state.news.headlines,
    likedNews: state.liked.likedNews,
    likedHeadlines: state.liked.likedHeadlines
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNews: (params) => dispatch(NewsActions.getNewsRequest(params)),
    getHeadlines: (params) => dispatch(NewsActions.getHeadlinesRequest(params)),
    likeNews: (params) => dispatch(LikeActions.likeNews(params)),
    likeHeadlines: (params) => dispatch(LikeActions.likeHeadlines(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
