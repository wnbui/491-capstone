import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from 'react';

function NotesApp() {
  const menuItems = [
    { name: 'NOTES', href: '#' },
    { name: 'MESSAGES', href: '#' },
    { name: 'PLANNER', href: '#' },
    { name: 'PROJECT MANAGER', href: '#' },
    { name: 'FILES', href: '#' }
  ];

  const notes = [
    { id: 1, creator: '***', lastUpdated: '***' },
    { id: 2, creator: '***', lastUpdated: '***' },
    { id: 3, creator: '***', lastUpdated: '***' }
  ];

  return (
    <div style={{
      backgroundColor: 'orange',
      border: '1px solid black',
      width: '600px',
      height: '500px',
      margin: '50px',
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{ float: 'right', padding: '10px' }}>
        <span style={{ marginRight: '10px', fontWeight: 'bold' }}>TEAM</span>
        {/* Team member icons */}
        {[1,2,3,4,5].map((i) => (
          <span key={i} style={{ 
            display: 'inline-block', 
            width: '25px', 
            height: '25px', 
            backgroundColor: '#666',
            borderRadius: '50%',
            margin: '2px',
            textAlign: 'center',
            lineHeight: '25px',
            color: 'white',
            fontSize: '12px'
          }}>👤</span>
        ))}
        <span style={{ 
          display: 'inline-block', 
          width: '25px', 
          height: '25px', 
          backgroundColor: '#666',
          borderRadius: '50%',
          margin: '2px 10px',
          textAlign: 'center',
          lineHeight: '25px',
          color: 'white'
        }}>+</span>
        <span style={{ 
          display: 'inline-block', 
          width: '25px', 
          height: '25px', 
          backgroundColor: '#666',
          borderRadius: '50%',
          margin: '2px',
          textAlign: 'center',
          lineHeight: '25px',
          color: 'white',
          fontSize: '12px'
        }}>✉</span>
        <span style={{ 
          display: 'inline-block', 
          width: '25px', 
          height: '25px', 
          backgroundColor: '#666',
          borderRadius: '50%',
          margin: '2px',
          textAlign: 'center',
          lineHeight: '25px',
          color: 'white'
        }}>⚙</span>
        <span style={{ 
          display: 'inline-block', 
          width: '25px', 
          height: '25px', 
          backgroundColor: '#666',
          borderRadius: '50%',
          margin: '2px',
          textAlign: 'center',
          lineHeight: '25px',
          color: 'white',
          fontSize: '12px'
        }}>👤</span>
      </div>

      <div style={{ clear: 'both', paddingTop: '60px' }}>
        {/* Left sidebar menu */}
        <div style={{ float: 'left' }}>
          <table>
            <tbody>
              {menuItems.map((item, index) => (
                <tr key={index}>
                  <td style={{
                    border: '1px solid black',
                    textAlign: 'center',
                    width: '100px',
                    padding: '10px',
                    backgroundColor: 'white'
                  }}>
                    <a 
                      href={item.href} 
                      style={{ 
                        textDecoration: 'none', 
                        color: 'black',
                        fontSize: '12px'
                      }}
                    >
                      {item.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Main content area */}
        <div style={{
          float: 'right',
          backgroundColor: 'lightgray',
          width: '470px',
          height: '460px'
        }}>
          <p style={{ textAlign: 'center', paddingTop: '10px', fontWeight: 'bold' }}>
            NOTES
          </p>
          
          {/* Notes container */}
          <div style={{
            backgroundColor: 'white',
            margin: '25px',
            width: 'calc(100% - 50px)',
            height: 'calc(100% - 80px)',
            padding: '10px',
            boxSizing: 'border-box'
          }}>
            {notes.map((note) => (
              <div key={note.id} style={{ marginBottom: '10px', fontSize: '14px' }}>
                Note {note.id} Creator: {note.creator} Last Updated {note.lastUpdated}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
