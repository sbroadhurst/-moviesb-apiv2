import React from 'react'
import Poster from './Poster'
import PreviewArea from './PreviewArea'

class Swimlane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPreview: true,
      movieData: []
    }
    this.toggleClass = this.toggleClass.bind(this)
    this.posterSelected = this.posterSelected.bind(this)
  }

  posterSelected(data) {
    let info = data
    //console.log(data)
    this.setState({
      movieData: info
    })
  }

  renderPopular() {
    const posters = this.props.posters.slice(0, 8)

    return (
      <div
        style={{
          width: '80%',
          height: '20vw',
          overflow: 'auto',
          display: 'inline',
          margin: '2%'
        }}
      >
        {posters.map((info, index) => {
          return (
            <Poster
              key={index}
              info={info}
              id={info.id}
              select={this.posterSelected}
            />
          )
        })}
      </div>
    )
  }

  renderPreview() {
    const { movieData } = this.state
    return <PreviewArea onClick={this.toggleClass} movieData={movieData} />
  }

  toggleClass() {
    this.setState({ PreviewArea: !this.state.PreviewArea })
  }

  render() {
    let preview = this.state.PreviewArea ? 'none' : 'blocks'
    const { map } = this.props
    //  console.log('zzzz', popular)
    return (
      <div>
        <div style={{ border: '1px solid black', width: '600px' }}>
          {this.renderPopular(map)}{' '}
        </div>
        <div style={{ display: preview }} onClick={this.toggleClass}>
          {this.renderPreview()}{' '}
        </div>
      </div>
    )
  }
}
export default Swimlane
