/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { Box, Button, CircularProgress, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import slideApi from '../../../../api/slideApi';
import InputField from '../../../../components/form-controls/InputField'

export default function FormPlayerMultipleChoice({ socket }) {
  const { enqueueSnackbar } = useSnackbar();

  const [slideList, setSlideList] = useState([]);
  // const [loadingSlideList, setLoadingSlideList] = useState(true);

  const schema = yup.object().shape({
    code: yup.string().required('Please enter code.')
  });
  const form = useForm({
    defaultValues: {
      code: 0,
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState

  const handleSubmit = async (values) => {
    try {
      const response = await slideApi.getSlidesByCode({
        code: values.code,
      });

      if (response.status === true) {
        setSlideList(response.data.data);
      } else {
        enqueueSnackbar("getSlidesByCode fail", {
          variant: "error",
          autoHideDuration: 1000
        });
      }

    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000
      });
    }
  }



  
  const [indexSlides, setIndexSlides] = useState(0);
  const onChangeValueRadio = async (event) => {
    try {
      

      console.log(event.target.value);
      socket.emit('multiChoice', { id: slideList[indexSlides]?._id, index: event.target.value })

      if (indexSlides < slideList.length - 1) {
        setIndexSlides((prev) => {
          const prevNew = prev + 1;
          return prevNew;
        });
      }
      // eslint-disable-next-line no-param-reassign
      event.target.value = null;


    } catch (error) {
      console.log("fail")
    }
  }



  return (
    <Box>
      {(slideList.length !== 0) ? <div />
        : <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="code" label="Code" form={form} />
          {
            isSubmitting &&
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          }

          <Button sx={{
            marginTop: 2,
            backgroundColor: '#afa98e'
          }}
            disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
            Enter
          </Button>
        </form>}

      <Box sx={{
        marginLeft: '45%',
        marginTop: '100px'
      }}>
        <Container> 
          <form id="create-course-form" onChange={onChangeValueRadio}>
            <FormLabel id="demo-radio-buttons-group-label">{slideList[indexSlides]?.question}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {slideList[indexSlides]?.labels.map((option, index) => (
                <FormControlLabel
                  key={option._id}
                  value={index}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </form>
        </Container>


      </Box>
    </Box>
  );
}