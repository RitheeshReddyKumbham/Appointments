import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, starClicked} = props
  const {title, date, isStared, id} = appointmentDetails

  const onClickStar = () => {
    starClicked(id)
  }

  const starImg = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="header">
        <p className="title">{title}</p>
        <p className="date">{date}</p>
        <button
          className="star-button"
          data-testid="star"
          type="button"
          onClick={onClickStar}
        >
          <img className="star" src={starImg} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
