import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material"
import Image from "next/image"
import { motion, useAnimation } from 'framer-motion'
import { ButtonCustom } from "@/app/(site)/components/Swiper"
import TextFieldInput from "@/app/components/Inputs/TextFieldInput"
import PasswordField from "@/app/components/Inputs/PasswordField"
import MuiLink from "@mui/material/Link";
import Link from "next/link"
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckBoxField from "@/app/components/Inputs/CheckBoxField"
import DatePickerField from "@/app/components/Inputs/DatePickerField"
import SelectField from "@/app/components/Inputs/SelectField"
import { useCountries, useGetActivityLevel, useGetFitnessGoal, useGetHealthConditioan, useGetProfileDetails, useHealthInfo, useProfile } from "@/api/accounts";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector } from "@/Store/reducers";
import { RootState } from "@/Store/store";

// Yup schema to validate the form
const schema = Yup.object().shape({
    email: Yup.string().required().email("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(3),
});


interface IRenderContent {
    type: "basic" | ""
}


type ICountries = {
    country_code: string
    country_name: string
    created_at: string
    id: string
    numeric_code: string
    updated_at: string
}

type IActivityLevel = {
    id: string,
    created_at: string,
    updated_at: string,
    title: string,
    is_active: boolean,
    description?: string
}
const RenderContent: React.FC<IRenderContent> = ({ type }) => {

    const { mutate } = useProfile(
        {
            onSuccess: (data: any) => {
                // dispatch(setGmailVerifey({ email: data.user_validator }))
                // dispatch(setToken({ token: data?.access, refershToken: data?.refresh, tokenEx: data?.access_expires_at, refereshTokenEx: data?.refresh_expires_at }))
                // router.push('/home');
            },
            onError: (error) => {

                // setShowSwipeble(true)
                // setShowDialog(true)
                // setErrorText({ title: error?.response?.data?.title, code: error?.response?.data?.code })
            }
        }
    )
    const { mutate: mutateHealthInfo } = useHealthInfo(
        {
            onSuccess: (data: any) => {
                // dispatch(setGmailVerifey({ email: data.user_validator }))
                // dispatch(setToken({ token: data?.access, refershToken: data?.refresh, tokenEx: data?.access_expires_at, refereshTokenEx: data?.refresh_expires_at }))
                // router.push('/home');
            },
            onError: (error) => {

                // setShowSwipeble(true)
                // setShowDialog(true)
                // setErrorText({ title: error?.response?.data?.title, code: error?.response?.data?.code })
            }
        }
    )


    //user redux
    const profileDetailData = useAppSelector((state: RootState) => state.reducer.user.profileDetail)

    //Select Items 
    const [countriesSelect, setCountriesSelect] = React.useState<{ title: string, value: string, titleCode: string, numericCode: string }[]>();
    const [activityLevelSelect, setActivityLevelSelect] = React.useState<{ title: string, value: string, titleCode: string, numericCode: string }[]>();
    const [fitnessSelect, serFitnessSelect] = React.useState<{ title: string, value: string, titleCode: string, numericCode: string }[]>();
    const [healthSelect, sethealthSelect] = React.useState<{ title: string, value: string, titleCode: string, numericCode: string }[]>();
    //value
    const [selectedValue, setSelectedValue] = React.useState<number | string>('');
    const [selectedGender, setSelectedGenderValue] = React.useState<number | string>('');
    const [selectedActivity, setSelectedActivityValue] = React.useState<number | string>('');
    const [selectedFitness, setSelectedFitnessValue] = React.useState<number | string>('');
    const [selectedHealth, setSelectedHealthValue] = React.useState<number | string>('');

   const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    profileDetailData?.profile?.birth_date ? dayjs(profileDetailData.profile.birth_date) : null
);
    const [formattedDate, setFormattedDate] = React.useState<string>('');

    //value weight && height
    const [weightValue, setWeightValue] = React.useState<string>("")
    const [heightValue, setHeightValue] = React.useState<string>("")
    const handleDateChange = (date: Dayjs | null, formatted: string) => {
        setSelectedDate(date);
        setFormattedDate(formatted);

        // You can also directly use the date here for API calls, etc.
        if (formatted) {
            // Save to database or state management
            //   saveDateToBackend(formatted);
        }
    };

    //GET Query
    const { data: countries, isLoading, isError, isSuccess } = useCountries();
    const { data: activityLevels, } = useGetActivityLevel();
    const { data: fitnessGoal, } = useGetFitnessGoal();
    const { data: healthCondition, } = useGetHealthConditioan();


    const handleCountryChange = (value: string) => {

        setSelectedValue(value);
    };
    const handleGenderChange = (value: string) => {

        setSelectedGenderValue(value);
    };
    const handleAtivityChange = (value: string) => {

        setSelectedActivityValue(value);
    };
    const handleFitnessChange = (value: string) => {

        setSelectedFitnessValue(value);
    };
    const handleHealthConditionChange = (value: string) => {
        setSelectedHealthValue(value);
    };


    React.useEffect(() => {
        if (countries?.results && countries?.results.length > 0) {
            setCountriesSelect(countries?.results.map((c:any) => ({ title: c.country_name, value: c.id, titleCode: c.country_code, numericCode: c.numeric_code })))
        }
    }, [countries])
    React.useEffect(() => {
        if (activityLevels?.results && activityLevels?.results?.length > 0) {
            setActivityLevelSelect(activityLevels?.results.map((a: IActivityLevel) => ({ title: a.title, value: a.id })))
        }
    }, [activityLevels])

    React.useEffect(() => {
        if (fitnessGoal?.results && fitnessGoal?.results?.length > 0) {
            serFitnessSelect(fitnessGoal?.results.map((a: IActivityLevel) => ({ title: a.title, value: a.id })))
        }
    }, [fitnessGoal])

    React.useEffect(() => {
        if (healthCondition?.results && healthCondition?.results?.length > 0) {
            sethealthSelect(healthCondition?.results.map((a: IActivityLevel) => ({ title: a.title, value: a.id })))
        }
    }, [healthCondition])

    React.useEffect(() => {

        if (profileDetailData) {
            ///complale default value inputs
            setSelectedGenderValue(profileDetailData?.profile?.gender)
            setSelectedValue(profileDetailData?.profile?.country?.id)
            setSelectedActivityValue(profileDetailData?.health_info?.activity_level?.id)
            setSelectedFitnessValue(profileDetailData?.health_info?.fitness_goal?.id)
            setSelectedHealthValue(profileDetailData?.health_info?.health_condition?.id)
            setWeightValue(profileDetailData?.health_info?.weight?.toString())
            setHeightValue(profileDetailData?.health_info?.height?.toString())
        }
    }, [profileDetailData])



    // Formik hook to handle the form state
    // const formik = useFormik({
    //     initialValues: {
    //         birth_date: "",
    //         gender: "",
    //         country_id:"",
    //     },

    //     // Pass the Yup schema to validate the form
    //     validationSchema: schema,

    //     // Handle form submission
    //     onSubmit: async ({ email, password }) => {
    //         // Make a request to your backend to store the data
    //         console.log(email);

    //     },
    // });

    // Destructure the formik object
    // const { errors, touched, values, handleChange, handleSubmit } = formik;



    // DEBUG: see what's happening
    // console.log("values:", values);
    // console.log("errors:", errors);

    const handleChangeHeight = (e: any) => {
        if (e.target.value.length < 4) {
            setHeightValue(e.target.value)

        }
    }

    const handleChangeWeight = (e: any) => {
        if (e.target.value.length < 4) {
            setWeightValue(e.target.value)

        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        mutate({
            birth_date: formattedDate,
            country_id: selectedValue?.toString(),
            gender: selectedGender?.toString(),
            phone_number: ""

        })
        mutateHealthInfo(
            {
                activity_level_id: selectedActivity?.toString(),
                fitness_goal_id: selectedFitness?.toString(),
                health_condition_id: selectedHealth?.toString(),
                weight: +weightValue,
                height: +heightValue

            })
    }


    return (
        <div>
            {(() => {
                switch (type) {
                    case "basic":
                        return (
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",

                            }}>
                                <form style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "14px",
                                    paddingTop: "10px"
                                }}
                                    onSubmit={handleSubmit}
                                    method="POST"
                                >
                                    <DatePickerField
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    />
                                    <SelectField
                                        label="select your gender"
                                        items={[{ title: "Male", value: "M" },
                                        { title: "Fmale", value: "F" }]}
                                        value={selectedGender?.toString()}
                                        onChange={handleGenderChange}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    />
                                    <SelectField
                                        label="select your country"
                                        items={countriesSelect ?? []}
                                        value={selectedValue?.toString()}
                                        onChange={handleCountryChange}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    />

                                    <SelectField
                                        label="Activity Level"
                                        items={activityLevelSelect ?? []}
                                        value={selectedActivity?.toString()}
                                        onChange={handleAtivityChange}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    />
                                    <SelectField
                                        label="Fitness Level"
                                        items={fitnessSelect ?? []}
                                        value={selectedFitness?.toString()}
                                        onChange={handleFitnessChange}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    />
                                    <SelectField
                                        label="Health Conditions"
                                        items={healthSelect ?? []}
                                        value={selectedHealth?.toString()}
                                        onChange={handleHealthConditionChange}
                                    // error={errors.email}
                                    // touched={touched.email}
                                    />

                                    <Box>
                                        <Grid container spacing={2}>
                                            <Grid size={6}>
                                                <TextFieldInput
                                                    fullWidth

                                                    value={heightValue}
                                                    handleChange={handleChangeHeight}
                                                    type="number"
                                                    name="height"
                                                    label="Height (Cm)"
                                                    style={{ border: '1px solid #727272', borderRadius: "5px" }}
                                                // error={errors.email}
                                                // touched={touched.email}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <TextFieldInput
                                                    value={weightValue}
                                                    handleChange={handleChangeWeight}
                                                    type="number"
                                                    name="weight"
                                                    fullWidth
                                                    label="Weight (Kg)"
                                                    style={{ border: '1px solid #727272', borderRadius: "5px" }}
                                                // error={errors.email}
                                                // touched={touched.email}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <ButtonCustom type="submit">Save</ButtonCustom>
                                </form>
                            </Box>
                        )



                    default:
                        return <div>Default Case</div>;
                }
            })()}
        </div>
    )
}

export default RenderContent;