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

import { Name, Email, CreatedAt, Point } from "./tableCol"

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

const CompanyList = props => {
  //meta title
  document.title = "Бүх компани"

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
      role: (contact && contact.role) || "",
      point: (contact && contact.point) || 0,
      isEmployer: (contact && contact.isEmployer) || true,
      isEmployee: (contact && contact.isEmployer) || false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your phone"),
      email: Yup.string().required("Please Enter Your Email"),
      role: Yup.string().required("Please Enter Your role"),
      point: Yup.number().required("Please Enter Your point"),
    }),
    onSubmit: values => {
      const updateCompany = {
        id: contact.id,
        firstName: values.firstName,
        phone: values.phone,
        email: values.email,
        role: values.role,
        point: values.point,
        isEmployer: values.isEmployer,
        isEmployee: values.isEmployee,
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
                  src={`https://ihelp-hr.com/upload/${cellProps.profile}`}
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
        Header: "И-мэйл",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
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
        Header: "Пойнт",
        accessor: "point",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <Point {...cellProps} />
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
      role: company.role,
      point: company.point,
      isEmployee: company.isEmployee,
      isEmployer: company.isEmployer,
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
                            <div className="mb-3">
                              <Label className="form-label">Ролэ</Label>
                              <Input
                                id="role"
                                name="role"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.role || ""}
                                invalid={
                                  validation.touched.role &&
                                  validation.errors.role
                                    ? true
                                    : false
                                }
                              >
                                <option>user</option>
                                <option>operator</option>
                                <option>admin</option>
                              </Input>
                            </div>
                            <div
                              className="mb-3"
                              style={{
                                alignItems: "center",
                              }}
                            >
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
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Пойнт</Label>
                              <Input
                                name="point"
                                label="Point"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.point || ""}
                                invalid={
                                  validation.touched.point &&
                                  validation.errors.point
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.point &&
                              validation.errors.point ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.point}
                                </FormFeedback>
                              ) : null}
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

export default withRouter(CompanyList)
