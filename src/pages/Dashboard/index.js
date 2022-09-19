import React from "react"
import { Container } from "reactstrap"

const Dashboard = () => {
  //meta title
  document.title = "Нүүр"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>Нүүр</Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
