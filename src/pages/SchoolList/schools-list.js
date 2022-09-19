import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import Dropzone from "react-dropzone"

import { Name, Email, Tags, Projects, Img, CreatedAt } from "./contactlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getSchools as onGetSchools,
  addNewSchool as onAddNewSchool,
  updateSchool as onUpdateSchool,
  deleteSchool as onDeleteSchool,
} from "store/school/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const SchoolList = props => {
  //meta title
  document.title = "Сургууль нэмэх"
  const token = JSON.parse(localStorage.getItem("amazon-token"))
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  const [selectedFiles, setselectedFiles] = useState([])
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      createdAt: (contact && contact.createdAt) || "",
      photo: (contact && contact.photo) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your name"),
    }),
    onSubmit: values => {
      if (isEdit) {
        const updateSchool = {
          id: contact.id,
          name: values.name,
          createdAt: values.createdAt,
        }
        // update school
        if (selectedFiles[0]) {
          const xhr = new XMLHttpRequest()
          const data = new FormData()
          data.append("file", selectedFiles[0])
          xhr.open(
            "PUT",
            `http://128.199.128.37/api/v1/schools/${contact.id}/photo`,
            {
              headers,
            }
          )
          xhr.send(data)
        }
        dispatch(onUpdateSchool(updateSchool))
        validation.resetForm()
        setIsEdit(false)
      } else {
        const newSchool = {
          name: values["name"],
        }
        // save new school
        dispatch(onAddNewSchool(newSchool))
        validation.resetForm()
      }
      toggle()
    },
  })

  const { schools } = useSelector(state => ({
    schools: state.schools.schools,
  }))

  const [schoolList, setSchoolList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "Зураг",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.photo ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={`http://128.199.128.37/upload/${cellProps.photo}`}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Нэр",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Үүсгэсэн огноо",
        accessor: "createdAt",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <CreatedAt {...cellProps} />
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const schoolData = cellProps.row.original
                  handleSchoolClick(schoolData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const schoolData = cellProps.row.original
                  onClickDelete(schoolData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (schools && !schools.length) {
      dispatch(onGetSchools())
      setIsEdit(false)
    }
  }, [dispatch, schools])

  useEffect(() => {
    setContact(schools)
    setIsEdit(false)
  }, [schools])

  useEffect(() => {
    if (!isEmpty(schools) && !!isEdit) {
      setContact(schools)
      setIsEdit(false)
    }
  }, [schools])

  const toggle = () => {
    setModal(!modal)
  }

  const handleSchoolClick = arg => {
    const school = arg
    setContact({
      id: school._id,
      name: school.name,
      createdAt: school.createdAt,
      photo: school.photo,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = schools => {
    setContact(schools)
    setDeleteModal(true)
  }

  const handleDeleteSchool = () => {
    dispatch(onDeleteSchool(contact))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleSchoolClicks = () => {
    setSchoolList("")
    setIsEdit(false)
    toggle()
  }
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
  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteSchool}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="School List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={schools}
                    isGlobalFilter={true}
                    isAddUserList={true}
                    handleUserClick={handleSchoolClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {!!isEdit ? "Edit School" : "Add School"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          {/* profile */}
                          <Col>
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
                                                <strong>
                                                  {f.formattedSize}
                                                </strong>
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
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Хадгалах
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(SchoolList)
