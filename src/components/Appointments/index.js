import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointmentsList,
    title: '',
    date: '',
    showStarred: false,
    formattedDate: '',
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title && date) {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: new Date(date).toLocaleDateString('en-GB'),
        isStared: false,
      }
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
        formattedDate: new Date(date).toLocaleDateString('en-GB'),
      }))
    }
  }

  starClicked = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStared: !eachApp.isStared}
        }
        return eachApp
      }),
    }))
  }

  filterStars = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  render() {
    const {
      appointmentsList,
      title,
      date,
      showStarred,
      formattedDate,
    } = this.state
    const filteredAppointmentsList = showStarred
      ? appointmentsList.filter(eachItem => eachItem.isStared)
      : appointmentsList

    return (
      <div className="main">
        <div className="appoint-details">
          <form className="details" onSubmit={this.addAppointment}>
            <h1 className="heading">Add Appointment</h1>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="title"
              value={title}
              placeholder="Title"
              onChange={this.changeTitle}
            />
            <label htmlFor="date" className="label">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="date"
              value={date}
              onChange={this.changeDate}
            />
            <button className="btn" type="submit">
              Add
            </button>
          </form>
          {formattedDate && (
            <p className="formatted-date">Formatted Date: {formattedDate}</p>
          )}
          <img
            className="app-img"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            alt="appointments"
          />
        </div>
        <div className="second-head">
          <h1 className="para">Appointments</h1>
          <button className="starred" type="button" onClick={this.filterStars}>
            {showStarred ? 'All' : 'Starred'}
          </button>
        </div>
        <ul className="total-appoints">
          {filteredAppointmentsList.map(eachAppoint => (
            <AppointmentItem
              key={eachAppoint.id}
              appointmentDetails={eachAppoint}
              starClicked={this.starClicked}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Appointments
