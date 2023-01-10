import React from "react";
import UnauthedNavbar from "../components/unauthedNavbar";
import { withRouter } from "../common/with-router";
import authService from "../services/auth.service";
import { object, string } from "yup";
import { Formik, Form, useField, ErrorMessage } from "formik";

function RegisterPage(props) {
  const RegisterValidation = object().shape({
    username: string().required("Required"),
    email: string().required("Required").email("Valid email required"),
    password: string().required("Required"),
  });

  const handleSubmit = (values) => {
    authService
      .register(values.username, values.email, values.password)
      .then(() => {
        props.router.navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Input = ({ name, label, ...props }) => {
    const [field, meta] = useField(name);
    return (
      <div className="mb-3">
        <input
          className={`${
            meta.error && meta.touched ? "border border-danger" : ""
          } form-control`}
          {...field}
          {...props}
          placeholder={label}
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-danger"
        />
      </div>
    );
  };

  return (
    <div>
      <UnauthedNavbar />

      <div className="d-flex align-items-center justify-content-center">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={RegisterValidation}
        >
          {() => {
            return (
              <Form className="w-50 p-3">
                <div className="card">
                  <h5 className="card-header">New User Registration</h5>
                  <div className="card-body">
                    <Input name="username" label="Username" />
                    <Input name="email" label="Email" />
                    <Input name="password" label="Password" type="password" />
                    <button className="btn btn-primary w-100" type="submit">
                      Sign Up
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default withRouter(RegisterPage);
