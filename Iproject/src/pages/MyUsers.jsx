import React, { useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchToken } from '../store/appSlice';
import { BiLogoGithub, BiLogoInstagram, BiLogoTwitch, BiLogoTwitter, BiLogoWhatsapp } from 'react-icons/bi';
import { FaCheck } from "react-icons/fa"
import { BiSolidBadgeCheck } from "react-icons/bi";
import axios from '../config/instance'; 
import { useNavigate } from 'react-router-dom';

export default function MyUsers() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.appReducer);
  const { status } = useSelector((state) => state.appReducer);
  const navigate = useNavigate()

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        '/payment/midtrans/token',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      
      window.snap.pay(data.token, {
        onSuccess: async function(result) {
          // Update user's subscription to "premium" on successful payment
          try {
            await axios.put('/payment/midtrans/success', {}, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            });
            
            // Add any additional logic needed after successful payment
            alert("Payment success!");
            dispatch(fetchUsers())
            console.log(result);
          } catch (error) {
            console.log(error);
          }
        },
        onPending: function(result) {
          alert("Waiting for your payment!");
          console.log(result);
        },
        onError: function(result) {
          alert("Payment failed!");
          console.log(result);
        },
        onClose: function() {
          alert('You closed the popup without finishing the payment');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let IsFree = user.status === "Free"

  useEffect(() => {
    dispatch(fetchUsers());
   
}, []);


  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4 flex justify-between">
              <div className='flex'>
              <MDBBreadcrumbItem>
                <a href='http://localhost:5173/post'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="http://localhost:5173/myusers">User</a>
              </MDBBreadcrumbItem>
                </div>
                {IsFree ? (
                <button
                  onClick={handlePayment}
                  className='bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-l-xl w-20 h-8'
                  style={{ fontFamily: "Roboto Mono" }}
                >
                  Upgrade
                </button>
              ) : (
                <p style={{ fontFamily: "IBM Plex Sans Arabic", fontWeight: "600" }}>
                  PREMIUM
                </p>
              )}
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user.image ? user.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="rounded-circle m-auto"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">{user.address? user.address : null}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn onClick={() => navigate(`/userProfile/${user.id}`)}>UPDATE</MDBBtn>
                  <MDBBtn outline className="ms-1" onClick={() => navigate(`/add`)}>POST</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <BiLogoInstagram className='size-6'/>
                    <MDBCardText>Instagram</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <BiLogoWhatsapp className='size-6'/>
                    <MDBCardText>Whatsapp</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <BiLogoTwitter className='size-6'/>
                    <MDBCardText>Twitter</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <BiLogoGithub className='size-6'/>
                    <MDBCardText>GitHub</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <BiLogoTwitch className='size-6'/>
                    <MDBCardText>Twitch</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name  </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <div>
  {IsFree ? (
    <MDBCardText className="text-muted flex">{user.fullName}</MDBCardText>
  ) : (
    <MDBCardText className="text-muted flex">
      {user.fullName} <BiSolidBadgeCheck className='ms-1 mt-1' style={{color: "#22d3ee"}}/>
    </MDBCardText>
  )}
</div>

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.address ? user.address : "Not provided"}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}