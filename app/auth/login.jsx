import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../(service)/api/api";
import { loginUserAction } from "../(redux)/authSlice";
import {useDispatch, useSelector} from 'react-redux'


const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .label("Eamil"),
  password: Yup.string()
    .min(4, "Password must be at least 8 characters")
    .required("Password is required")
    .label("Password"),
});

const login = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });

  const dispatch = useDispatch()
  
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {mutation?.isError && (
        <Text style={styles.errorText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      )}
      {mutation?.isSuccess && (
        <Text style={styles.successText}>Login Success</Text>
      )}
      <Formik
        initialValues={{
          email: "rishibose1901@gmail.com",
          password: "rishibose@123",
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          // console.log(values);

          mutation
            .mutateAsync(values)
            .then((data) => {
              dispatch(loginUserAction(data))
              router.push("/(tabs)");
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              {mutation?.isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  successText: {
    color: "green",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
