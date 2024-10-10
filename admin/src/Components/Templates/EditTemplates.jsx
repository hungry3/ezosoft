import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { axiosConfig } from '../../utils/axiosConfig';
import Image from '/src/assets/images/admin-dashboard-image-icon.svg';

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const coverImageRefs = useRef([]);
  const multipleImageRefs = useRef([]); // Ref to store multiple images
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [templateData, setTemplateData] = useState({
    title: '',
    description: '',
    category: '',
    avatar: null,
    templates: [{ templateTitle: '', templateContent: '', templateImage: null, templatePageImage: [], templateUrl: '' }]
  });

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const { data } = await axiosConfig.get(`/admin/template/${id}`);
        const fetchedTemplate = data.data;

        setTemplateData({
          title: fetchedTemplate.name,
          description: fetchedTemplate.description,
          category: fetchedTemplate.category,
          avatar: fetchedTemplate.avatar || null,
          templates: fetchedTemplate.templates || [{ templateTitle: '', templateContent: '', templateImage: null, templatePageImage: [], templateUrl: '' }]
        });
      } catch (error) {
        console.error('Error fetching template data:', error);
      }
    };
    fetchTemplateData();
  }, [id]);

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
    updatedTemplates[index].templatePageImage = files.map((file) => URL.createObjectURL(file)); // Preview images
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
    formData.append('name', templateData.title);
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
      }

      // Handle multiple images for templatePageImage
      template.templatePageImage.forEach((image, imgIndex) => {
        const fileInput = document.getElementById(`multipleImagesInput-${index}`);
        const files = fileInput?.files;
        if (files && files[imgIndex]) {
          formData.append(`templates[${index}][templatePageImage]`, files[imgIndex]);
        }
      });

      if (template.templateUrl) {
        formData.append(`templates[${index}][templateUrl]`, template.templateUrl);
      }
    });

    try {
      const response = await axiosConfig.post(`/admin/update-template/${id}`, formData, {
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
                  value={templateData.title}
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
              placeholder='Enter Template Description'
              value={templateData.description}
              onChange={(e) => handleTemplateChange(e, 'description')}
            ></textarea>
          </div>

                  {/* Avatar Image */}
                  <div className='mb-[30px]'>
            <h3 className='text-[20px] font-semibold mb-4'>Cover Image</h3>
            <div onClick={() => fileInputRef.current.click()} className='w-fit flex items-center justify-center border border-[#D9D9D9] bg-[#FAFAFA] cursor-pointer rounded-md h-[300px]'>
              {templateData.avatar ? (
                <img
                  src={typeof templateData.avatar === 'string' ? templateData.avatar : URL.createObjectURL(templateData.avatar)}
                  alt='Cover'
                  className='object-contain w-full h-full rounded-md'
                />
              ) : (
                <img src={Image} alt="Placeholder" />
              )}
            </div>
            <input type='file' accept='image/*' ref={fileInputRef} onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>

          {/* Template Details */}
          <div className='mb-[30px]'>
            <h3 className='text-[20px] font-semibold mb-4'>Template Details</h3>
            {templateData.templates.map((template, index) => (
              <div key={index} className='mb-[20px] p-[20px] border border-[#D9D9D9] bg-[#FAFAFA] rounded-md'>
                <div className='mb-[20px]'>
                  <label className='text-[14px] font-[Poppins] font-medium'>Template Title</label>
                  <input
                    type='text'
                    className='w-full mt-[4px] px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                    value={template.templateTitle}
                    onChange={(e) => handleTemplateDetailChange(e.target.value, index, 'templateTitle')}
                  />
                </div>

                <div className='mb-[20px]'>
                  <label className='text-[14px] font-[Poppins] font-medium'>Template Description</label>
                  <textarea
                    className='w-full mt-[4px] px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                    value={template.templateContent}
                    onChange={(e) => handleTemplateDetailChange(e.target.value, index, 'templateContent')}
                  ></textarea>
                </div>

                <div className='mb-[20px]'>
                  <label className='text-[14px] font-[Poppins] font-medium'>Template URL</label>
                  <input
                    type='text'
                    className='w-full mt-[4px] px-[22px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px]'
                    placeholder='Enter Template URL'
                    value={template.templateUrl}
                    onChange={(e) => handleTemplateDetailChange(e.target.value, index, 'templateUrl')}
                  />
                </div>

                {/* Template Page Images */}
                <div className='mb-[20px]'>
                  <label className='text-[14px] font-[Poppins] font-medium'>Template Page Images</label>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {template.templatePageImage.map((image, imgIndex) => (
                      <div key={imgIndex} className='relative'>
                        <img src={image} alt={`Template Page ${imgIndex + 1}`} className='w-[100px] h-[100px] rounded-md object-cover' />
                        <button
                          type='button'
                          onClick={() => {
                            const updatedTemplates = [...templateData.templates];
                            updatedTemplates[index].templatePageImage.splice(imgIndex, 1);
                            setTemplateData({ ...templateData, templates: updatedTemplates });
                          }}
                          className='absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full'
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={(e) => handleMultipleImagesChange(e, index)}
                    className='mt-[10px]'
                    id={`multipleImagesInput-${index}`}
                  />
                </div>

                {/* Remove Template Button */}
                {templateData.templates.length > 1 && (
                  <button
                    type='button'
                    className='bg-red-500 text-white px-[10px] py-[5px] rounded-md'
                    onClick={() => removeTemplate(index)}
                  >
                    Remove Template
                  </button>
                )}
              </div>
            ))}

            <button type='button' className='bg-blue-500 text-white px-[20px] py-[10px] rounded-md mt-[10px]' onClick={addNewTemplate}>
              Add New Template
            </button>
          </div>

          <button type='submit' className='bg-green-500 text-white px-[20px] py-[10px] rounded-md'>Update Template</button>
        </div>
      </div>
    </form>
  );
};

export default EditTemplate;

         