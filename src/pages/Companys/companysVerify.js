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
import ModalImage from "react-modal-image"

import { Name, Email, CreatedAt, Point, IsApproved } from "./tableCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getCompanys as onGetCompanys,
  updateCompany as onUpdateCompany,
  deleteCompany as onDeleteCompany,
} from "store/company/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const CompanyVerify = props => {
  //meta title
  document.title = "Компани баталгаажуулах"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // valid
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      firstName: (contact && contact.firstName) || "",
      phone: (contact && contact.phone) || "",
      email: (contact && contact.email) || "",
      isApproved: (contact && contact.isApproved) || false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your phone"),
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: values => {
      const updateCompany = {
        id: contact.id,
        firstName: values.firstName,
        phone: values.phone,
        email: values.email,
        isApproved: values.isApproved,
      }
      // update company
      dispatch(onUpdateCompany(updateCompany))
      validation.resetForm()
      setIsEdit(false)
      toggle()
    },
  })
  const { companys } = useSelector(state => ({
    companys: state.companys.companys,
  }))

  const [companyList, setCompanyList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "Про",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.profile ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.firstName.slice(0, 1)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={`http://128.199.128.37/upload/${cellProps.profile}`}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Нэр",
        accessor: "firstName",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Утас",
        accessor: "phone",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Баталгаажсан эсэх",
        accessor: "isApproved",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <IsApproved {...cellProps} />
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
        Header: "Гэрээ",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {cellProps.authPhoto && (
              <div style={{ flexDirection: "row" }}>
                {cellProps.authPhoto.image1 && (
                  <ModalImage
                    className="rounded-circle avatar-xs"
                    small={`http://128.199.128.37/upload/${cellProps.authPhoto.image1}`}
                    large={`http://128.199.128.37/upload/${cellProps.authPhoto.image1}`}
                    alt="Hello World!"
                  />
                )}
                {cellProps.authPhoto.image2 && (
                  <ModalImage
                    className="rounded-circle avatar-xs"
                    small={`http://128.199.128.37/upload/${cellProps.authPhoto.image2}`}
                    large={`http://128.199.128.37/upload/${cellProps.authPhoto.image2}`}
                    alt="Hello World!"
                  />
                )}
                {cellProps.authPhoto.image3 && (
                  <ModalImage
                    className="rounded-circle avatar-xs"
                    small={`http://128.199.128.37/upload/${cellProps.authPhoto.image3}`}
                    large={`http://128.199.128.37/upload/${cellProps.authPhoto.image3}`}
                    alt="Hello World!"
                  />
                )}
                <ModalImage
                  className="rounded-circle avatar-xs"
                  small={`http://128.199.128.37/upload/${cellProps.authPhoto.image4}`}
                  large={`http://128.199.128.37/upload/${cellProps.authPhoto.image4}`}
                  alt="Hello World!"
                />
              </div>
            )}
          </>
        ),
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
                  const companyData = cellProps.row.original
                  handleCompanyClick(companyData)
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
                  const companyData = cellProps.row.original
                  onClickDelete(companyData)
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
    if (companys && !companys.length) {
      dispatch(onGetCompanys())
      setIsEdit(false)
    }
  }, [dispatch, companys])

  useEffect(() => {
    setContact(companys)
    setIsEdit(false)
  }, [companys])

  useEffect(() => {
    if (!isEmpty(companys) && !!isEdit) {
      setContact(companys)
      setIsEdit(false)
    }
  }, [companys])

  const toggle = () => {
    setModal(!modal)
  }

  const handleCompanyClick = arg => {
    const company = arg

    setContact({
      id: company._id,
      firstName: company.firstName,
      phone: company.phone,
      email: company.email,
      isApproved: company.isApproved,
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

  const onClickDelete = companys => {
    setContact(companys)
    setDeleteModal(true)
  }

  const handleDeleteCompany = () => {
    dispatch(onDeleteCompany(contact))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleCompanyClicks = () => {
    setCompanyList("")
    setIsEdit(false)
    toggle()
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCompany}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbItem="Хэрэглэгчид" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={companys}
                    isGlobalFilter={true}
                    handleUserClick={handleCompanyClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      Хэрэглэгч шинэчлэх
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
                              <Label className="form-label">Нэр</Label>
                              <Input
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
                              {validation.touched.firstName &&
                              validation.errors.firstName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.firstName}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Утас</Label>
                              <Input
                                name="phone"
                                label="Phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">И-мэйл</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="square-switch mb-3">
                              <Label className="form-label">
                                Хэрэглэгч баталгаажуулах
                              </Label>
                              <input
                                name="isApproved"
                                type="checkbox"
                                id="square-switch3"
                                switch="bool"
                                onChange={validation.handleChange}
                                value={validation.values.isApproved}
                              />
                              <label
                                htmlFor="square-switch3"
                                data-on-label="Yes"
                                data-off-label="No"
                              />
                            </div>
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

export default withRouter(CompanyVerify)
