import React from "react";
import { useState } from "react";
import { withRouter } from "../common/with-router";
import authService from "../services/auth.service";
import { object, string } from "yup";
import { Formik, Form, useField, ErrorMessage } from "formik";
import UnauthedNavbar from "../components/unauthedNavbar";

function LoginPage(props) {
  const LoginValidation = object().shape({
    email: string().required("Required").email("Valid email required"),
    password: string().required("Required"),
  });

  const [alert, setAlert] = useState(null);

  const handleSubmit = (values) => {
    authService
      .login(values.email, values.password)
      .then(() => {
        props.router.navigate("/dashboard");
      })
      .catch((err) => {
        setAlert(JSON.parse(err.request.response).msg);
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
      {alert && (
        <div className="container w-50 pt-2">
          <div className="alert alert-danger text-center" role="alert">
            {alert}
          </div>
        </div>
      )}
      <div className="d-flex align-items-center justify-content-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={LoginValidation}
        >
          {() => {
            return (
              <Form className="w-50 p-3">
                <div className="card">
                  <h5 className="card-header">Sign In</h5>
                  <div className="card-body">
                    <Input name="email" label="Email" />
                    <Input name="password" label="Password" type="password" />
                    <button className="btn btn-primary w-100" type="submit">
                      Sign In
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

export default withRouter(LoginPage);
