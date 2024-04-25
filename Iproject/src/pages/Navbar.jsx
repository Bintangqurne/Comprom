import { useNavigate } from 'react-router-dom';
import axios from '../config/instance';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../store/appSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {value, status} = useSelector((state) => state.appReducer)

  useEffect(() => {
    if (!localStorage.access_token) {
      navigate('/login');
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  
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
  
  useEffect(() => {
    dispatch(fetchToken());
  }, []);

  let isFree = status === 'Free';
  let isPremium = status === 'Premium';
  
  return (
    <>
      
              <button onClick={handlePayment} className="btn btn-info mx-1">
                Upgrade
              </button>
           
    </>
  );
}
