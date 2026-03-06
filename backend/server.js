const express = require('express')
const mysql = require('mysql2');
const cors = require('cors')
const bcrypt = require('bcrypt');
//ml - prediction
const { getPrediction } = require("./mlService");

//image upload
const path = require('path');
const multer = require('multer');
// image storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/doctors');
    },
    filename: (req, file, cb) => {
        const uniqueName = `doctor_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// patient image storage
const patientStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/patients');
    },
    filename: (req, file, cb) => {
        const uniqueName = `patient_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const uploadPatient = multer({ storage: patientStorage });

const upload = multer({ storage });



const app = express()
app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: 'HospitalDBMS'
})

app.get('/doctors', (request, result) => {
    const sql = "SELECT * FROM Doctor"
    db.query(sql, (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})


app.get('/doctors/:id', (request, result) => {
    const doctorId = request.params.id;
    const sql = "SELECT * FROM Doctor WHERE doctor_id = ?"
    db.query(sql, [doctorId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})

app.get('/doctorProfile/:id', (request, result) => {
    const doctorid = request.params.id;
    const sql = "SELECT * FROM doctor WHERE doctor_id  = ?"
    db.query(sql, [doctorid], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})


app.get('/newPatientId', (request, result) => {
    const sql = "SELECT (MAX(patient_id)+1) AS id FROM Patient"
    db.query(sql, (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})


// patient signup

const saltRounds = 10; // can adjust, 10-12 is good

app.post(
  "/newPatientDetails",
  uploadPatient.single("profilePhoto"),
  async (req, res) => {
    const {
      id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      address,
      phoneNumber,
      email,
      bloodType,
      emergencyContact,
      allergies,
      medicalConditions,
      password,
    } = req.body;

    try {
      // 🔐 hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const profilePhoto = req.file
        ? `uploads/patients/${req.file.filename}`
        : null;

      const sql1 = `
        INSERT INTO patient 
        (patient_id, first_name, last_name, date_of_birth, gender, address,
         phone_number, email, blood_type, emergency_contact, allergies,
         existing_conditions , profile_photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      {/*const sql2 = `INSERT INTO login (patient_id, password) VALUES (?, ?)`;*/}
      const sql2 = `INSERT INTO login (patient_id, email, password) VALUES (?, ?, ?)`;
      

      db.query(
        sql1,
        [
          id,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          address,
          phoneNumber,
          email,
          bloodType,
          emergencyContact,
          allergies,
          medicalConditions,
          profilePhoto,
        ],
        (err) => {
          if (err) return res.status(500).json(err);

          db.query(sql2, [id, email, hashedPassword], (err) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({ success: true });
          });
        }
      );
    } catch (err) {
      res.status(500).json({ error: "Password hashing failed" });
    }
  }
);

{/*
app.post(
  "/newPatientDetails",
  uploadPatient.single("profilePhoto"),
  (request, result) => {

    const sql = `
      INSERT INTO patient 
      (patient_id, first_name, last_name, date_of_birth, gender, address,
       phone_number, email, blood_type, emergency_contact, allergies,
       medical_conditions, profile_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const sql2 = "INSERT INTO login VALUES (?, ?)";

    const {
      id, firstName, lastName, dateOfBirth, gender,
      address, phoneNumber, email, bloodType,
      emergencyContact, allergies, medicalConditions, password
    } = request.body;

    const profilePhoto = req.file
      ? `uploads/patients/${req.file.filename}`
      : null;

    db.query(sql, [
      id, firstName, lastName, dateOfBirth, gender,
      address, phoneNumber, email, bloodType,
      emergencyContact, allergies, medicalConditions,
      profilePhoto
    ], (err) => {
      if (err) return result.status(500).json(err);
    });

    db.query(sql2, [id, password], (err) => {
      if (err) return result.status(500).json(err);
    });

    result.status(201).json("success");
});
*/}
{/*
app.post('/newPatientDetails', (request, result) => {
    const sql = "INSERT INTO Patient VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const sql2 = "INSERT INTO Login VALUES (?, ?)";
    
    const {
        id,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        bloodType,
        emergencyContact,
        allergies,
        medicalConditions,
        password
    } = request.body;

    db.query(sql, [id, firstName, lastName, dateOfBirth, gender, address, phoneNumber, email, bloodType, emergencyContact, allergies, medicalConditions], (err, data) => {
        if (err) {
            return result.status(500).json(err);
        }
    })

    db.query(sql2, [id, password], (err, data) => {
        if (err) {
            return result.status(500).json(err);
        }
    })

    return result.status(201).json("success")
})
*/}

//update patientphoto
app.put(
  "/updatePatientPhoto/:id",
  uploadPatient.single("profilePhoto"),
  (req, res) => {

    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const photoPath = `uploads/patients/${req.file.filename}`;

    const sql = `
      UPDATE patient
      SET profile_photo = ?
      WHERE patient_id = ?
    `;

    db.query(sql, [photoPath, id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Profile image updated successfully!" });
    });
});

//verify hashed password
app.get('/loginPatientDetails/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT patient_id, name, email, phone, age
    FROM patient
    WHERE patient_id = ?
  `;

  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.json(null);
    res.json(data[0]);
  });
});


{/*app.post("/loginPatient", (req, res) => {
  {/*const { patientId, password } = req.body;

  const sql = "SELECT password FROM login WHERE patient_id = ?";
  const { email, password } = req.body;

  const sql = "SELECT patient_id, password FROM login WHERE email = ?";
  db.query(sql, [patientId], async (err, data) => {
    if (err) return res.status(500).json({ success: false });
    if (data.length === 0)
      return res.json({ success: false });

    const match = await bcrypt.compare(password, data[0].password);

    if (!match)
      return res.json({ success: false });

    res.json({ success: true, patientId });
    {/*patientId: data[0].patient_id
  });
});
*/}

app.post("/loginPatient", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT login.password, login.patient_id 
    FROM login
    JOIN patient ON login.patient_id = patient.patient_id
    WHERE patient.email = ?
  `;

  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json({ success: false });

    if (data.length === 0)
      return res.json({ success: false });

    const match = await bcrypt.compare(password, data[0].password);

    if (!match)
      return res.json({ success: false });

    res.json({
      success: true,
      patientId: data[0].patient_id
    });
  });
});

{/*
app.get('/loginPatientDetails/:id', (request, result) => {
    const patientId = request.params.id;
    const sql = "SELECT password FROM Login WHERE patient_id = ?"
    db.query(sql, [patientId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})
*/}

app.post('/bookAppointment', (request, result) => {

    const presql = "SELECT MAX(appointment_id) as id FROM Appointment"
    let appointment_id = '';
    db.query(presql, (err, data) => {
        if (err) {
            return result.status(500).json(err);
        }
        else{
            appointment_id = data[0].id + 1


            const sql = "INSERT INTO Appointment VALUES (?, ?, ?, ?, ?, ?, ?);";
            const {
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                appointment_reason
            } = request.body;
            const status = "pending";
            db.query(sql, [appointment_id, patient_id, doctor_id, appointment_date, appointment_time, appointment_reason, status], (err, data) => {
                if (err) {
                    //return result.status(500).json(err);
                    return res.status(500).json({ error: err.message });

                }
            })


            const sql2 = "INSERT INTO Bill VALUES (default, ?, ?, ?, ?);";
            db.query(sql2, [appointment_id, 0, appointment_date, 'pending'], (err, data) => {
                if (err) {
                    //return result.status(500).json(err);
                    return res.status(500).json({ error: err.message });

                }
            })
        }


        const sql3 = "INSERT INTO Prescription VALUES (default, ?, ?, ?, ?, ?);";
            db.query(sql3, [appointment_id, '', '', 'Daily', 0], (err, data) => {
                if (err) {
                    return result.status(500).json(err);
                }
                return result.status(201).json("success");

            })

    })
})



app.get('/patientProfile/:id', (request, result) => {
    const patientId = request.params.id;
    const sql = "SELECT * FROM Patient WHERE patient_id = ?"
    db.query(sql, [patientId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})

// Update patient details (excluding patient_id and email)
app.put('/updatePatientDetails/:id', (req, res) => {
  const { id } = req.params;
  const {
    first_name, last_name, date_of_birth, gender,
    address, phone_number, blood_type,
    emergency_contact, allergies, existing_conditions
  } = req.body;

  const sql = `
    UPDATE patient SET 
      first_name = ?, 
      last_name = ?, 
      date_of_birth = ?, 
      gender = ?, 
      address = ?, 
      phone_number = ?, 
      blood_type = ?, 
      emergency_contact = ?, 
      allergies = ?, 
      existing_conditions = ?
    WHERE patient_id = ?
  `;
const formatDate = (dateStr) => { if (!dateStr) return null; return dateStr.split('T')[0]; // keep only YYYY-MM-DD 
};
  db.query(sql, [
    first_name, last_name,formatDate(date_of_birth), gender,
    address, phone_number, blood_type,
    emergency_contact, allergies, existing_conditions, id
  ], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Profile updated successfully!' });
  });
});

// Update patient password
app.put('/updatePassword/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `UPDATE login SET password = ? WHERE patient_id = ?`;

  db.query(sql, [hashedPassword, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Password updated successfully!' });
  });
});
{/*}
app.put('/updatePassword/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `UPDATE login SET password = ? WHERE patient_id = ?`;

  db.query(sql, [hashedPassword, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Password updated successfully!' });
  });
});
*/}
{/*
app.put('/updatePassword/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const sql = `UPDATE login SET password = ? WHERE patient_id = ?`;

  db.query(sql, [password, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Password updated successfully!' });
  });
});
*/}

app.get('/patientAppointments/:id', (request, result) => {
    const patientId = request.params.id;
    const sql = "SELECT * FROM Appointment WHERE patient_id = ?"
    db.query(sql, [patientId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})


app.post('/cancelAppointment', (request, result) => {
    const {appointmentId} = request.body;
    const sql = "UPDATE Appointment SET status = 'cancelled' WHERE appointment_id = ?"
    db.query(sql, [appointmentId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json("success");
        }
    })
})



app.post('/rebookAppointment', (request, result) => {
    const {appointmentId} = request.body;
    const sql = "UPDATE Appointment SET status = 'pending' WHERE appointment_id = ?"
    db.query(sql, [appointmentId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json("success");
        }
    })
})

app.get('/newDoctorIdda', (req, res) => {
    const sql = "SELECT IFNULL(MAX(doctor_id), 0) + 1 AS id FROM doctor";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching next doctorId:", err);
            return res.status(500).json({ message: "Database error", error: err.sqlMessage });
        }
        res.json(data);  // Example response: [{ "id": 12 }]
    });
});



app.delete('/deleteDoctor/:id', (request, result) => {
    const doctorId = request.params.id;
    const sql = "DELETE FROM Doctor WHERE doctor_id = ?"
    db.query(sql, [doctorId], (err, data) => {
        if(err){
            return result.json(err);
        }
        else{
            return result.json(data);
        }
    })
})

//doctor signup

app.post('/doctorsignup', upload.single('profilePhoto'), async (req, res) => {
  try {
    const {
      doctorId,
      firstName,
      lastName,
      specialization,
      phoneNumber,
      email,
      availableDays,
      availableFrom,
      availableTo,
      yearsOfExperience,
      salary,
      password
    } = req.body;

    // 🔐 HASH PASSWORD HERE
    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePhoto = req.file
      ? `uploads/doctors/${req.file.filename}`
      : null;

    const doctorSql = `
      INSERT INTO doctor 
      (doctor_id, first_name, last_name, specialization, phone_number, email,
       available_days, available_from, available_to, years_of_experience, salary, profile_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const doctorValues = [
      doctorId,
      firstName,
      lastName,
      specialization,
      phoneNumber,
      email,
      availableDays,
      availableFrom,
      availableTo,
      yearsOfExperience,
      salary,
      profilePhoto
    ];

    db.query(doctorSql, doctorValues, (err) => {
      if (err) return res.status(500).json({ message: "Doctor insert error" });

      {/*const loginSql =
        "INSERT INTO doctorlogin (doctor_id, password) VALUES (?, ?)";*/}

      const loginSql =
  "INSERT INTO doctorlogin (doctor_id, email, password) VALUES (?, ?, ?)";

      // ✅ STORE HASHED PASSWORD
      db.query(loginSql, [doctorId, email, hashedPassword], (err2) => {
        if (err2) return res.status(500).json({ message: "Login insert error" });

        res.status(201).json({ message: "Doctor added successfully" });
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

{/*}
app.post('/doctorsignup', upload.single('profilePhoto'), (req, res) => {
  const {
    doctorId,
    firstName,
    lastName,
    specialization,
    phoneNumber,
    email,
    availableDays,
    availableFrom,
    availableTo,
    yearsOfExperience,
    salary,
    password
  } = req.body;

  // ✅ If image uploaded → path, else NULL
  const profilePhoto = req.file
    ? `uploads/doctors/${req.file.filename}`
    : null;

  const doctorSql = `
    INSERT INTO doctor 
    (doctor_id, first_name, last_name, specialization, phone_number, email,
     available_days, available_from, available_to, years_of_experience, salary, profile_photo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const doctorValues = [
    doctorId,
    firstName,
    lastName,
    specialization,
    phoneNumber,
    email,
    availableDays,
    availableFrom,
    availableTo,
    yearsOfExperience,
    salary,
    profilePhoto
  ];

  db.query(doctorSql, doctorValues, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Doctor insert error" });
    }

    const loginSql =
      "INSERT INTO doctorlogin (doctor_id, password) VALUES (?, ?)";

    db.query(loginSql, [doctorId, password], (err2) => {
      if (err2) {
        return res.status(500).json({ message: "Login insert error" });
      }

      res.status(201).json({ message: "Doctor added successfully" });
    });
  });
});
*/}

app.post('/addDoctor', (request, result) => {

    const sql = `
INSERT INTO doctor 
(first_name, last_name, specialization, phone_number, email, available_days, available_from, available_to, years_of_experience, salary) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

    const {
        firstName,
        lastName,
        specialization,
        phoneNumber,
        email,
        availableDays,
        availableFrom,
        availableTo,
        yearsOfExperience,
        salary
    } = request.body;
    const status = "pending";
    db.query(sql, [firstName, lastName, specialization, phoneNumber, email, availableDays, availableFrom, availableTo, yearsOfExperience, salary], (err, data) => {
        if (err) {
            return result.status(500).json(err);
        }
        else{
            return result.status(201).json("success")
        }
    })

})
//doctor login

{/*app.post('/loginDoctor', (req, res) => {
  const { doctorId, password } = req.body;

  const sql = "SELECT password FROM doctorlogin WHERE doctor_id = ?";

  db.query(sql, [doctorId], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(401).json({ success: false });
    }

    // 🔍 Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, data[0].password);

    if (!isMatch) {
      return res.status(401).json({ success: false });
    }

    // ✅ LOGIN SUCCESS
    res.json({ success: true, doctorId });
  });
});
*/}

app.post('/loginDoctor', (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT dl.password, d.doctor_id
    FROM doctorlogin dl
    JOIN doctor d ON dl.doctor_id = d.doctor_id
    WHERE d.email = ?
  `;

  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.json({ success: false });
    }

    const match = await bcrypt.compare(password, data[0].password);

    if (!match) {
      return res.json({ success: false });
    }

    res.json({
      success: true,
      doctorId: data[0].doctor_id
    });
  });
});


{/*}
app.post('/loginDoctor', (req, res) => {
    const { doctorId, password } = req.body;
    const sql = "SELECT * FROM DoctorLogin WHERE doctor_id = ? AND password = ?";
    db.query(sql, [doctorId, password], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            return res.json({ success: true, doctorId });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});
*/}
//fetch appoinments for doctor
app.get('/doctorlogin/:id', (req, res) => {
    const doctorId = req.params.id;

    const sql = `
        SELECT a.appointment_id, a.patient_id, a.doctor_id, a.appointment_date,a.appointment_time,a.appointment_reason,a.status,
               p.patient_id, p.first_name, p.last_name,p.gender,p.address,p.phone_number,p.email,p.existing_conditions,p.allergies,p.profile_photo
        FROM Appointment a
        JOIN Patient p ON a.patient_id = p.patient_id
        WHERE a.doctor_id = ?
    `;

    db.query(sql, [doctorId], (err, data) => {
        if (err) {
            return res.json({ error: err });
        } else {
            return res.json(data);
        }
    });
});


// Update appointment status
// Update appointment status, with optional reschedule
app.post('/updateAppointmentStatus', (req, res) => {
    const { appointmentId, status, appointment_date, appointment_time } = req.body;

    let sql, params;

    if (status === "Rescheduled") {
        sql = "UPDATE Appointment SET status = ?, appointment_date = ?, appointment_time = ? WHERE appointment_id = ?";
        params = [status, appointment_date, appointment_time, appointmentId];
    } else {
        sql = "UPDATE Appointment SET status = ? WHERE appointment_id = ?";
        params = [status, appointmentId];
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.json({ message: "Appointment updated successfully", result });
        }
    });
});

// Update doctor details
app.put('/updateDoctorDetails/:id', (req, res) => {
  const { id } = req.params;
  const {
    first_name, last_name, specialization,
    phone_number, available_days, available_from, available_to,
    years_of_experience, salary
  } = req.body;

  const sql = `
    UPDATE doctor SET 
      first_name = ?, 
      last_name = ?, 
      specialization = ?, 
      phone_number = ?, 
      available_days = ?, 
      available_from = ?, 
      available_to = ?, 
      years_of_experience = ?, 
      salary = ?
    WHERE doctor_id = ?
  `;

  db.query(sql, [
    first_name, last_name, specialization,
    phone_number, available_days, available_from, available_to,
    years_of_experience, salary, id
  ], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Doctor profile updated successfully!' });
  });
});


// Update doctor password

app.put('/updateDoctorPassword/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `UPDATE doctorlogin SET password = ? WHERE doctor_id = ?`;

    db.query(sql, [hashedPassword, id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Doctor password updated successfully!' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

{/*}
app.put('/updateDoctorPassword/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const sql = `UPDATE doctorlogin SET password = ? WHERE doctor_id = ?`;

  db.query(sql, [password, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Password updated successfully!' });
  });
});
*/}
// Get all patients
app.get('/allPatients', (req, res) => {
  db.query('SELECT patient_id, first_name, last_name, email, phone_number FROM patient', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Delete patient by ID
app.delete('/deletePatient/:id', (req, res) => {
  const { id } = req.params;

  // First delete from login table (to avoid FK issues), then patient
  {/*db.query('DELETE FROM login WHERE patient_id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    */}
    db.query('DELETE FROM patient WHERE patient_id = ?', [id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: 'Patient removed successfully!' });
    });
  });




//ml - prediction

app.post("/diagnose", async (req, res) => {
  const symptoms = req.body; // JSON { itching:1, skin_rash:0, ... }
  try {
    const prediction = await getPrediction(symptoms);
    res.json(prediction); 
    // { predicted_disease: "Fungal infection", specialist: "Dermatologist" }
  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }
});

// Review system
app.post('/reviews', (req, res) => {
    const { appointment_id, patient_id, doctor_id, rating, review_text } = req.body;

    const insertSql = "INSERT INTO reviews (appointment_id, patient_id, doctor_id, rating, review_text) VALUES (?, ?, ?, ?, ?)";
    const insertParams = [appointment_id, patient_id, doctor_id, rating, review_text];

    db.query(insertSql, insertParams, (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "You have already submitted a review for this appointment." });
            }
            return res.status(500).json({ error: "Failed to submit review", details: err });
        }

        const updateSql = ` UPDATE doctor d SET avg_rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE doctor_id = ?), 0), total_reviews = (SELECT COUNT(*) FROM reviews WHERE doctor_id = ?) WHERE doctor_id = ?`;
        const updateParams = [doctor_id, doctor_id, doctor_id];

        db.query(updateSql, updateParams, (err2, result2) => {
            if (err2) {
                return res.status(500).json({ error: "Review saved but failed to update doctor rating", details: err2 });
            }

            return res.json({ message: "Review submitted successfully", reviewId: result.insertId });
        });
    });
});

//get top doctor
// GET /doctors/top/:specialization
app.get('/doctors/top/:specialization', (req, res) => {
    const specialization = req.params.specialization;
    const sql = `
        SELECT doctor_id, first_name, last_name, specialization, avg_rating, total_reviews
        FROM doctor
        WHERE specialization = ?
        ORDER BY avg_rating DESC, total_reviews DESC
        LIMIT 5`;
    db.query(sql, [specialization], (err, rows) => {
        if (err) return res.status(500).json({ error: "Failed to fetch top doctors", details: err });
        res.json(rows);
    });
});

//top doctor by specialization 

// Get doctors by specialization, sorted by rating
app.get('/doctors/specialization/:specialization', (req, res) => {
    const specialization = req.params.specialization;

    const sql = `
        SELECT doctor_id, first_name, last_name, specialization, avg_rating, total_reviews,
               available_days, available_from, available_to, years_of_experience,profile_photo
        FROM Doctor
        WHERE specialization = ?
        ORDER BY avg_rating DESC, total_reviews DESC`;

    db.query(sql, [specialization], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});


//get reviews for a doctor
app.get('/reviews/doctor/:id', (req, res) => {
    const doctorId = req.params.id;
    const sql = "SELECT * FROM reviews WHERE doctor_id = ? ORDER BY created_at DESC";

    db.query(sql, [doctorId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch reviews", details: err });
        }
        return res.json(rows);
    });
});




app.listen(8081, () => {
    console.log("listening")
})
