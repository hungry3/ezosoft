
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosConfig } from '../../utils/axiosConfig';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const coverImageRefs = useRef([]);
  const multipleImageRefs = useRef([]); // Ref to store multiple images
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: '',
    avatar: null,
    templates: [{ templateTitle: '', templateContent: '', templateImage: null, templatePageImage: [], templateUrl: '' }]
  });

   const axiosPrivate= useAxiosPrivate()
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const { data } = await axiosPrivate.get(`/admin/template/${id}`);
        const fetchedTemplate = data.data;

        setTemplateData({
          name: fetchedTemplate.name,
          description: fetchedTemplate.description,
          category: fetchedTemplate.category,
          avatar: fetchedTemplate.avatar || null,
          templates: fetchedTemplate.templates.map(template => ({
            templateTitle: template.templateTitle,
            templateContent: template.templateContent,
            templateImage: template.templateImage || null,
            templatePageImage: template.templatePageImage || [],
            templateUrl: template.templateUrl
          })) || [{ templateTitle: '', templateContent: '', templateImage: null, templatePageImage: [], templateUrl: '' }]
        });
      } catch (error) {
        console.error('Error fetching template data:', error);
      }
    };
    fetchTemplateData();
  }, [id]);
  console.log("templatesData",templateData)

  const handleTemplateChange = (event, field) => {
    setTemplateData({ ...templateData, [field]: event.target.value });
  };

  const handleTemplateDetailChange = (value, index, field) => {
    const updatedTemplates = [...templateData.templates];
    updatedTemplates[index][field] = value;
    setTemplateData({ ...templateData, templates: updatedTemplates });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTemplateData((prevData) => ({ ...prevData, avatar: file }));
    }
  };

  const handleTemplateImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedTemplates = [...templateData.templates];
      updatedTemplates[index].templateImage = file;
      setTemplateData({ ...templateData, templates: updatedTemplates });
    }
  };

  const handleMultipleImagesChange = (event, index) => {
    const files = Array.from(event.target.files);
    const updatedTemplates = [...templateData.templates];
    updatedTemplates[index].templatePageImage = files;
    setTemplateData({ ...templateData, templates: updatedTemplates });
  };

  const removeImage = (index, imgIndex) => {
    const updatedTemplates = [...templateData.templates];
    updatedTemplates[index].templatePageImage.splice(imgIndex, 1); 
    setTemplateData({ ...templateData, templates: updatedTemplates });
  };

  const addNewTemplate = () => {
    setTemplateData((prevData) => ({
      ...prevData,
      templates: [...prevData.templates, { templateTitle: '', templateContent: '', templateImage: null, templatePageImage: [], templateUrl: '' }]
    }));
    coverImageRefs.current.push(React.createRef());
    multipleImageRefs.current.push(React.createRef());
  };

  const removeTemplate = (index) => {
    const updatedTemplates = templateData.templates.filter((_, i) => i !== index);
    setTemplateData({ ...templateData, templates: updatedTemplates });
    coverImageRefs.current.splice(index, 1);
    multipleImageRefs.current.splice(index, 1);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('name', templateData.name);
    formData.append('description', templateData.description);
    formData.append('category', templateData.category);

    if (templateData.avatar instanceof File) {
      formData.append('avatar', templateData.avatar);
    }

    templateData.templates.forEach((template, index) => {
      formData.append(`templates[${index}][templateTitle]`, template.templateTitle);
      formData.append(`templates[${index}][templateContent]`, template.templateContent);

      if (template.templateImage instanceof File) {
        formData.append(`templates[${index}][templateImage]`, template.templateImage);
      } else if (typeof template.templateImage === 'string') {
        formData.append(`templates[${index}][templateImage]`, template.templateImage);
      }

      const fileInput = multipleImageRefs.current[index]?.current;
      if (fileInput && fileInput.files) {
        Array.from(fileInput.files).forEach((file) => {
          formData.append(`templates[${index}][templatePageImage]`, file);
        });
      }

      if (template.templateUrl) {
        formData.append(`templates[${index}][templateUrl]`, template.templateUrl);
      }
    });
    console.log('Logging FormData before submission:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axiosPrivate.put(`/admin/update-template/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        navigate('/allTemplates');
      } else {
        console.error('Error updating template:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className='flex flex-col w-full bg-[#F9F9F9]'>
        <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex flex-col'>
          <h2 className='text-[24px] font-semibold mb-6'>Edit Template</h2>

          {/* Template Info Section */}
          <div className='mb-[30px]'>
            <h3 className='text-[20px] font-semibold mb-4'>Template Information</h3>
            <div className='flex flex-col md:flex-row gap-[20px]'>

              {/* Category */}
              <div className='flex flex-col w-[50%]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Category</label>
                <select
                  className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                  {...register('category', { required: true })}
                  value={templateData.category}
                  onChange={(e) => handleTemplateChange(e, 'category')}
                >
                  <option value='' disabled>Select a category</option>
                  <option value='template'>Template</option>
                  <option value='free template'>Free Template</option>
                  <option value='lifestyle'>Lifestyle</option>
                </select>
                {errors.category && <span className='text-red-400'>Category is required</span>}
              </div>

              {/* Title */}
              <div className='flex flex-col w-[50%]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Title</label>
                <input
                  type='text'
                  placeholder='Enter Template Title'
                  className='mt-[4px] pl-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                  {...register('title', { required: true })}
                  value={templateData.name}
                  onChange={(e) => handleTemplateChange(e, 'title')}
                />
                {errors.title && <span className='text-red-400'>Title is required</span>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='mb-[30px]'>
            <h3 className='text-[20px] font-semibold mb-4'>Template Description</h3>
            <textarea
              className='w-full h-[150px] px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
              {...register('description', { required: true })}
              value={templateData.description}
              onChange={(e) => handleTemplateChange(e, 'description')}
              placeholder='Enter Template Description'
            />
            {errors.description && <span className='text-red-400'>Description is required</span>}
          </div>

          {/* Avatar */}
          <div className='mb-[30px]'>
            <h3 className='text-[20px] font-semibold mb-4'>Avatar</h3>
            <input type='file' ref={fileInputRef} className='hidden' onChange={handleAvatarChange} />
            <div className='flex items-center justify-center'>
              {templateData.avatar ? (
                <img src={templateData.avatar instanceof File ? URL.createObjectURL(templateData.avatar) : templateData.avatar} alt='Template Avatar' className='w-[120px] h-[120px] object-cover rounded-md' />
              ) : (
                <img src={Image} alt='Default Avatar' className='w-[120px] h-[120px] object-cover rounded-md' />
              )}
            </div>
            <button type='button' className='px-4 py-2 mt-4 text-white rounded-md bg-blue' onClick={() => fileInputRef.current.click()}>Change Avatar</button>
          </div>

          {/* Templates */}
          {templateData.templates.map((template, index) => (
            <div key={index} className='mb-[30px]'>
              <h3 className='text-[20px] font-semibold mb-4'>Template {index + 1}</h3>

              {/* Template Title */}
              <div className='mb-[15px]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Template Title</label>
                <input
                  type='text'
                  className='mt-[4px] w-full px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                  value={template.templateTitle}
                  onChange={(e) => handleTemplateDetailChange(e.target.value, index, 'templateTitle')}
                  placeholder='Enter Template Title'
                />
              </div>

              {/* Template Content */}
              <div className='mb-[15px]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Template Content</label>
                <textarea
                  className='mt-[4px] w-full h-[100px] px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                  value={template.templateContent}
                  onChange={(e) => handleTemplateDetailChange(e.target.value, index, 'templateContent')}
                  placeholder='Enter Template Content'
                />
              </div>

              {/* Template Image */}
              <div className='mb-[15px]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Template Image</label>
                <input
                  type='file'
                  ref={el => coverImageRefs.current[index] = el}
                  onChange={(e) => handleTemplateImageChange(e, index)}
                  className='hidden'
                />
                <div className='flex items-center justify-center'>
                  {template.templateImage ? (
                    <img src={template.templateImage instanceof File ? URL.createObjectURL(template.templateImage) : template.templateImage} alt={`Template ${index + 1} Image`} className='w-[120px] h-[120px] object-cover rounded-md' />
                  ) : (
                    <img src={Image} alt='Default Template Image' className='w-[120px] h-[120px] object-cover rounded-md' />
                  )}
                </div>
                <button type='button' className='px-4 py-2 mt-4 text-white rounded-md bg-blue' onClick={() => coverImageRefs.current[index].click()}>Change Image</button>
              </div>

              {/* Multiple Page Images */}
              <div className='mb-[15px]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Page Images</label>
                <input
                  type='file'
                  multiple
                  ref={el => multipleImageRefs.current[index] = el}
                  onChange={(e) => handleMultipleImagesChange(e, index)}
                  className='hidden'
                />
                <div className='flex flex-wrap gap-4'>
                  {template.templatePageImage.map((image, imgIndex) => (
                    <div key={imgIndex} className='relative'>
                      <img src={image instanceof File ? URL.createObjectURL(image) : image} alt={`Page Image ${imgIndex + 1}`} className='w-[120px] h-[120px] object-cover rounded-md' />
                      <button type='button' className='absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full' onClick={() => removeImage(index, imgIndex)}>X</button>
                    </div>
                  ))}
                </div>
                <button type='button' className='px-4 py-2 mt-4 text-white rounded-md bg-blue' onClick={() => multipleImageRefs.current[index].click()}>Add More Images</button>
              </div>

              {/* Template URL */}
              <div className='mb-[15px]'>
                <label className='text-[14px] font-[Poppins] font-medium'>Template URL</label>
                <input
                  type='text'
                  className='mt-[4px] w-full px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                  value={template.templateUrl}
                  onChange={(e) => handleTemplateDetailChange(e.target.value, index, 'templateUrl')}
                  placeholder='Enter Template URL'
                />
              </div>

              <button type='button' className='px-4 py-2 mt-2 text-white bg-red-500 rounded-md' onClick={() => removeTemplate(index)}>Remove Template</button>
            </div>
          ))}

          <button type='button' className='px-4 py-2 mt-4 text-white rounded-md bg-green' onClick={addNewTemplate}>Add New Template</button>
          <button type='submit' className='px-4 py-2 mt-4 text-white rounded-md bg-blue'>Save Changes</button>
        </div>
      </div>
    </form>
  );
};

export default EditTemplate;
