import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Dropzone from "react-dropzone"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"
import "react-datepicker/dist/react-datepicker.css"
import { useFormik } from "formik"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
import { toast } from "react-toastify"
const CompanyCreate = () => {
  let history = useHistory()
  const [selectedFiles, setselectedFiles] = useState([])
  const token = JSON.parse(localStorage.getItem("amazon-token"))
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
      firstName: "",
      role: "user",
      isApproved: false,
      isEmployee: false,
      isEmployer: false,
      location: "",
      createYear: "",
      web: "",
      employerNumber: "Сонгох",
      phone: "",
      password: "",
    },
    onSubmit: values => {
      axios
        .post(
          `https://ihelp-hr.com/api/v1/profiles`,
          {
            email: values["email"],
            firstName: values["firstName"],
            role: values["role"],
            isApproved: values["isApproved"],
            location: values["location"],
            isEmployee: values["isEmployee"],
            isEmployer: values["isEmployer"],
            createYear: values["createYear"],
            web: values["web"],
            employerNumber: values["employerNumber"],
            phone: values["phone"],
            password: values["password"],
          },
          { headers }
        )
        .then(res => {
          const newCompany = res.data.data

          history.push("/")
          if (selectedFiles[0]) {
            const xhr = new XMLHttpRequest()
            const data = new FormData()
            data.append("file", selectedFiles[0])
            xhr.open(
              "PUT",
              `https://ihelp-hr.com/api/v1/profiles/profile/${newCompany._id}`,
              {
                headers,
              }
            )
            xhr.send(data)
          }
          toast.success("Амжиллтай шинэ компани нэмлээ", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        })
        .catch(err => {
          console.log(err)
          let message = err.response.data.error.message
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        })
    },
  })
  document.title = "Компани нэмэх"

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="" breadcrumbItem="Компани нэмэх" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Компани нэмэх</CardTitle>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                  >
                    {/* company email */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        И-мэйл
                      </Label>
                      <Col lg="10">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* company ner */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Компани нэр
                      </Label>
                      <Col lg="10">
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName &&
                            validation.errors.firstName
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* role */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Эрх
                      </Label>
                      <Col lg="10">
                        <Input
                          id="role"
                          name="role"
                          type="select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.role || ""}
                          invalid={
                            validation.touched.role && validation.errors.role
                              ? true
                              : false
                          }
                        >
                          <option>user</option>
                          <option>operator</option>
                          <option>admin</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Компани төрөл
                      </Label>
                      <Col lg="10">
                        <Input
                          type="checkbox"
                          id="isEmployer"
                          name="isEmployer"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.isEmployer}
                        />
                        <Label check>employer</Label>
                        <Input
                          type="checkbox"
                          style={{ marginLeft: 100 }}
                          id="isEmployee"
                          name="isEmployee"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.isEmployee || false}
                        />
                        <Label check>employee</Label>
                      </Col>
                    </FormGroup>
                    {/* verify */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Баталгаажуулах
                      </Label>
                      <Col lg="10">
                        <Input
                          id="isApproved"
                          name="isApproved"
                          type="select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.isApproved || ""}
                          invalid={
                            validation.touched.isApproved &&
                            validation.errors.isApproved
                              ? true
                              : false
                          }
                        >
                          <option>false</option>
                          <option>true</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    {/* location */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Хаяг
                      </Label>
                      <Col lg="10">
                        <Input
                          id="location"
                          name="location"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.location || ""}
                          invalid={
                            validation.touched.location &&
                            validation.errors.location
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* createYear */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Үүсгэн байгуулагдсан огноо
                      </Label>
                      <Col lg="10">
                        <Input
                          id="createYear"
                          name="createYear"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.createYear || ""}
                          invalid={
                            validation.touched.createYear &&
                            validation.errors.createYear
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* web */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Web site
                      </Label>
                      <Col lg="10">
                        <Input
                          id="web"
                          name="web"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.web || ""}
                          invalid={
                            validation.touched.web && validation.errors.web
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* employerNumber */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Нийт ажилчдийн тоо
                      </Label>
                      <Col lg="10">
                        <Input
                          id="role"
                          name="employerNumber"
                          type="select"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.employerNumber || ""}
                          invalid={
                            validation.touched.employerNumber &&
                            validation.errors.employerNumber
                              ? true
                              : false
                          }
                        >
                          <option>Сонгох</option>
                          <option>1-10</option>
                          <option>11-20</option>
                          <option>21-50</option>
                          <option>51-100</option>
                          <option>101-500</option>
                          <option>501-1000</option>
                          <option>1000+</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    {/* phone */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Утасны дугаар
                      </Label>
                      <Col lg="10">
                        <Input
                          id="phone"
                          name="phone"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.phone || ""}
                          invalid={
                            validation.touched.phone && validation.errors.phone
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* password */}
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Нууц үг
                      </Label>
                      <Col lg="10">
                        <Input
                          id="password"
                          name="password"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                      </Col>
                    </FormGroup>
                    {/* profile */}
                    <Row className="mb-4">
                      <Label className="col-form-label col-lg-2">
                        Профайл зураг
                      </Label>
                      <Col lg="10">
                        <Form>
                          <Dropzone
                            onDrop={acceptedFiles => {
                              handleAcceptedFiles(acceptedFiles)
                            }}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="dz-message needsclick">
                                    <div className="mb-3">
                                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>Зурагаа оруулна уу.</h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Dropzone>

                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              )
                            })}
                          </div>
                        </Form>
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          Нэмэх
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CompanyCreate
