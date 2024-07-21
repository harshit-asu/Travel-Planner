import React from "react";
import {
  MDBBadge,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
//   MDBScrollbar,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
  MDBBtn,
} from "mdb-react-ui-kit";
import Filter from "../Trip/Filter";

const Trip = () => {
  return (
    <MDBRow className="m-2 mt-0">
      <MDBCol md={3}>
        <Filter/>
      </MDBCol>
      <MDBCol md={9}>
      <section className="gradient-custom-2 vh-100 ">
      <MDBContainer className="py-4 h-100 ">
        <MDBRow className="d-flex justify-content-start">
          <MDBCol md="12" xl="10" className="w-100">
            <MDBCard>
              <MDBCardHeader className="p-3 ">
                <MDBRow>
                    <MDBCol md={8} className="d-flex flex-column justify-content-center">
                        <h4 className="mb-0 ms-4" style={{color: '#04b4bd'}}>
                            {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                            <strong>Seattle</strong>
                        </h4>
                    </MDBCol>
                    <MDBCol md={4} className="d-flex justify-content-center">
                        <MDBBtn className="mb-0 px-5 btn-custom " size="md">Add Activity</MDBBtn>
                    </MDBCol>
                </MDBRow>
              </MDBCardHeader>
              {/* <MDBScrollbar style={{ position: "relative", height: "400px" }}> */}
                <MDBCardBody>
                  <MDBTable className="mb-0">
                    <MDBTableHead>
                      <tr>
                        <th scope="col"><strong>Activity</strong></th>
                        <th scope="col"><strong>Start Time</strong></th>
                        <th scope="col"><strong>End Time</strong></th>
                        <th scope="col"><strong>Expenses</strong></th>
                        <th scope="col"><strong>Actions</strong></th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr className="fw-normal">
                        <th>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                            alt="avatar"
                            className="shadow-1-strong rounded-circle"
                            style={{ width: "45px", height: "auto" }}
                          />
                          <span className="ms-2">Hiking</span>
                        </th>
                        <td className="">
                          <span>5:00</span>
                        </td>
                        <td className="">
                          <h6 className="mb-0">
                          <span>6:00</span>
                          </h6>
                        </td>
                        <td>100</td>
                        <td className="">
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Edit"
                          >
                            <MDBIcon
                              fas
                              icon="pencil-alt"
                              size="lg"
                              className="me-3"
                              style={{color:"#04b4bd"}}
                            />
                          </MDBTooltip>
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Remove"
                          >
                            <MDBIcon
                              fas
                              icon="trash-alt"
                              color="danger"
                              size="lg"
                              className="me-3"
                            />
                          </MDBTooltip>
                        </td>
                      </tr>
                      <tr className="fw-normal">
                        <th>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                            alt="avatar"
                            className="shadow-1-strong rounded-circle"
                            style={{ width: "45px", height: "auto" }}
                          />
                          <span className="ms-2">Beach</span>
                        </th>
                        <td className="">
                          <span>7:00</span>
                        </td>
                        <td className="">
                          <h6 className="mb-0">
                            <span>8:00</span>
                          </h6>
                        </td>
                        <td>
                            300
                        </td>
                        <td className="">
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Edit"
                          >
                            <MDBIcon
                               fas
                               icon="pencil-alt"
                               size="lg"
                               className="me-3"
                               style={{color:"#04b4bd"}}
                            />
                          </MDBTooltip>
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Remove"
                          >
                            <MDBIcon
                              fas
                              icon="trash-alt"
                              color="danger"
                              size="lg"
                              className="me-3"
                            />
                          </MDBTooltip>
                        </td>
                      </tr>
                      <tr className="fw-normal">
                        <th>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            alt="avatar"
                            className="shadow-1-strong rounded-circle"
                            style={{ width: "45px", height: "auto" }}
                          />
                          <span className="ms-2">Sky Diving</span>
                        </th>
                        <td className="">
                          <span>3:00</span>
                        </td>
                        <td className="">
                          <h6 className="mb-0">
                            <span>4:00</span>
                          </h6>
                        </td>
                        <td>200</td>
                        <td className="">
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Edit"
                          >
                            <MDBIcon
                               fas
                               icon="pencil-alt"
                               size="lg"
                               className="me-3"
                               style={{color:"#04b4bd"}}
                            />
                          </MDBTooltip>
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Remove"
                          >
                            <MDBIcon
                              fas
                              icon="trash-alt"
                              color="danger"
                              size="lg"
                              className="me-3"
                            />
                          </MDBTooltip>
                        </td>
                      </tr>
                      
                     
                      
                    </MDBTableBody>
                  </MDBTable>
                </MDBCardBody>
              {/* </MDBScrollbar> */}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
      </MDBCol>
    </MDBRow>
  );
}

export default Trip;