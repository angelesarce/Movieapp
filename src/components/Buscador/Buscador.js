import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import {addMovieFavorite,getMovies} from '../../actions/index'
import './Buscador.css';



export class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies (this.state.title)
  }

  render() {
    const { title } = this.state;
    return (
      <div>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title"> Movie: </label>
            <input className="holder"
              placeholder="search for a movie here"
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button className="boton" type="submit">SEARCH</button>
        </form>
        <ul>
         {
           this.props.movies && this.props.movies.map (el => (
            <div key = {el.imdbID}>
              <NavLink className="movies" to= {`/movie/${el.imdbID}`}>{el.Title}
              </NavLink>
              <button className= "fav" onClick = {()=>this.props.addMovieFavorite({title:el.Title, id: el.imdbID})}>Add to favorite</button>
            </div>))
         }
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    movies: state.moviesLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMovieFavorite: movie => dispatch(addMovieFavorite(movie)),
    getMovies: title => dispatch(getMovies(title))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buscador);
