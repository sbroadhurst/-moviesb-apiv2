import React from 'react'
import Swimlane from '../components/Swimlane'
import '../Boxes.css'

class PageComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      selectValue: ''
    }
  }

  loadMedia(mediaType) {
    if (mediaType === 'tv') {
      fetch(
        'https://api.themoviedb.org/3/tv/popular?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(res => {
          // console.log(res)
          //          this.setState({ popularTv: res.results })
          this.props.setPopularTV(res.results)
        })
      fetch(
        ' https://api.themoviedb.org/3/tv/top_rated?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(top => {
          this.props.setTopRatedTV(top.results)
        })
      fetch(
        ' https://api.themoviedb.org/3/tv/on_the_air?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(air => {
          this.props.setTVOnAir(air.results)
        })

      //end of tv
    } else {
      fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(res => {
          this.props.setPopularMovies(res.results)
        })

      fetch(
        ' https://api.themoviedb.org/3/movie/top_rated?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(top => {
          this.props.setTopRatedMovies(top.results)
        })
      fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(upcoming => {
          this.props.setUpcomingMovies(upcoming.results)
        })
      fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1'
      )
        .then(res => {
          return res.json()
        })
        .then(playing => {
          this.props.setNowPlayingMovies(playing.results)
        })
      //end of movies
    }
  }

  handleChange(e) {
    this.loadMedia(e.target.value)
    this.setState({
      selectValue: e.target.value
    })

    // load movies or tv
    // set movies or tv
  }

  componentWillMount() {
    this.setState({ selectValue: 'movie' })
    this.loadMedia()
  }

  render() {
    const {
      PopularMovies,
      UpcomingMovies,
      TopRatedMovies,
      TopRatedTV,
      NowPlayingMovies,
      PopularTV,
      TVOnAir
    } = this.props
    //  console.log('hello from render', this.props)
    //  console.log(PopularMovies)

    if (this.state.selectValue === 'movie')
      return (
        <div>
          <select value={this.state.selectValue} onChange={this.handleChange}>
            <option value="movie">movie </option>
            <option value="tv"> tv </option>
          </select>
          <p className='text'>Now Playing</p>
          <div>
            <Swimlane type='movie' posters={NowPlayingMovies} />
          </div>
          <p className='text'>Popular</p>
          <div>
            <Swimlane type='movie' posters={PopularMovies} />{' '}
          </div>
          <p className='text'>Top Rated</p>
          <div>
            <Swimlane type='movie' posters={TopRatedMovies} />{' '}
          </div>
          <p className='text'>Upcoming </p>
          <div>
            <Swimlane type='movie' posters={UpcomingMovies} />
          </div>
        </div>
      )
    if (this.state.selectValue === 'tv')
      return (
        <div>
          <select value={this.state.selectValue} onChange={this.handleChange}>
            <option value="movie">movie </option>
            <option value="tv"> tv </option>
          </select>
          <p className='text'>Popular</p>
          <div>
            <Swimlane type='tv' posters={PopularTV} />{' '}
          </div>
          <p className='text'>Top Rated</p>
          <div>
            <Swimlane type='tv' posters={TopRatedTV} />{' '}
          </div>
          <p className='text'>TV On Air</p>
          <div>
            <Swimlane type='tv' posters={TVOnAir} />
          </div>
        </div>
      )
  }
}

export default PageComponent
