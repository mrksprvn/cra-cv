import "./App.css"
import data from "./cv.json"
import picture from "./picture.jpg"

import React, { Component } from "react"

export default class App extends Component {
  render() {
    const info = data[process.env.LANG || "FI"]
    const { name, jobs, education, skills } = info

    return (
      <div style={{ font: "14px serif" }}>
        <Header {...info} />
        <img
          src={picture}
          alt={name}
          height="108px"
          style={{ float: "right" }}
        />

        <SubHeading text="Kokemus" />
        {jobs.map(job => <Job key={job.title} {...job} />)}

        <SubHeading text="Koulutus" />
        {education.map(school => <School key={school.name} {...school} />)}

        <SubHeading text="Taidot" />
        <SkillRenderer skills={skills} />

        <Footer name={name} />
      </div>
    )
  }
}

const Header = ({ name, address, phone, email, github }) => (
  <div style={{ float: "left" }}>
    <h1 style={{ margin: 0 }}>{name}</h1>
    <p style={{ display: "inline-block", marginRight: "1em" }}>
      {address.address}
      <br />
      {address.zipcode}
      <br />
      {address.country}
    </p>
    <p style={{ display: "inline-block", marginRight: "1em" }}>
      <a href={`tel:${phone}`}>{phone}</a>
      <br />
      <a href={`mailto:${email}`}>{email}</a>
      <br />
      <a href={`https://github.com/${github}`}>github.com/{github}</a>
    </p>
  </div>
)

const Job = ({ company, title, description, ...p }) => (
  <div>
    <b>{company}</b>
    <br />
    {title}
    <TimeframeDisplay
      startTime={p.startTime}
      endTime={p.endTime}
      customTimeFrame={p.customTimeFrame}
    />
    {description &&
    description.length > 0 && (
      <ul style={{ paddingLeft: "2em" }}>
        {description.map(desc => <li key={desc}>{desc}</li>)}
      </ul>
    )}
  </div>
)

const School = ({ name, major, minor, ...p }) => (
  <p>
    <b>{name}</b>
    <br />
    {major}
    <TimeframeDisplay {...p} />
    {minor && <br />}
    {minor && minor}
  </p>
)

const SubHeading = ({ text }) => (
  <h3 style={{ clear: "both", borderBottom: "1px solid black" }}>{text}</h3>
)

const TimeframeDisplay = ({ startTime, endTime, customTimeFrame }) => (
  <span style={{ float: "right", fontStyle: "italic" }}>
    {customTimeFrame || `${startTime} - ${endTime || ""}`}
  </span>
)

const SkillRenderer = ({ skills }) => {
  const skillLines = [],
    size = 10

  // Split skills into chunks with ${size} length
  while (skills.length > 0) skillLines.push(skills.splice(0, size))

  return (
    <div>
      {skillLines.map((line, outerIndex) => (
        <p key={outerIndex}>
          {line.map((skill, innerIndex) => (
            <span key={skill}>
              {skill}
              {`${innerIndex === size - 1 || // Full line last elem check
              (outerIndex === skillLines.length - 1 &&
                innerIndex === line.length - 1) // Check if on the last skill line and if it's the last elem in it
                ? ""
                : ", "}` // Otherwise add comma+space
              }
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}

const Footer = ({ name }) => {
  const d = new Date()
  const date = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join(".")
  return (
    <footer style={{ position: "fixed", bottom: 0 }}>
      CV {name} {date}
    </footer>
  )
}
