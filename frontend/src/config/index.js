export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
export const addPetFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },  
  {
      label: "Animal Name",
      name: "name",
      componentType: "input",
      type: "text",
      placeholder: "Enter animal name",
    },
    {
      label: "Age",
      name: "age",
      componentType: "input",
      type: "number",
      placeholder: "Enter animal age",
    },
    {
      label: "Gender",
      name: "gender",
      componentType: "select",
      options: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "unknown", label: "Unknown" },
      ],
    },
    {
      label: "Species",
      name: "species",
      componentType: "select",
      options: [
        { id: "dog", label: "Dog" },
        { id: "cat", label: "Cat" },
        { id: "rabbit", label: "Rabbit" },
        { id: "bird", label: "Bird" },
        { id: "fish", label: "Fish" },
        { id: "reptile", label: "Reptile" },
        { id: "hamster", label: "Hamster" },
        { id: "other", label: "Other" },
      ],
    },
    {
      label: "Breed",
      name: "breed",
      componentType: "input",
      type: "text",
      placeholder: "Enter breed (if known)",
    },
    {
      label: "Size",
      name: "size",
      componentType: "select",
      options: [
        { id: "small", label: "Small" },
        { id: "medium", label: "Medium" },
        { id: "large", label: "Large" },
      ],
    },
    {
      label: "Colour",
      name: "colour",
      componentType: "select",
      options: [
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "brown", label: "Brown" },
        { id: "grey", label: "Grey" },
        { id: "orange", label: "Orange" },
        { id: "yellow", label: "Yellow" },
        { id: "green", label: "Green" },
        { id: "blue", label: "Blue" },
        { id: "purple", label: "Purple" },
        { id: "red", label: "Red" },
        { id: "pink", label: "Pink" },
        { id: "beige", label: "Beige" },
        { id: "multi", label: "Multi" },
        { id: "other", label: "Other" },
      ],
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter additional details",
    },
];

  export const navigationHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
        id: "adopt",
        label: "Adopt",
        path: "/shop/listing",
    },
    {
        id: "about",
        label: "About Us",
        path: "/shop/about",
     },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
    {
      id: "contact",
      label: "Contact",
      path: "/shop/contact",
    },
  ];
  
  export const animalOptionsMap = {
    dog: "Dog",
    cat: "Cat",
    rabbit: "Rabbit",
    hamster: "Hamster",
    bird: "Bird",
    fish: "Fish",
    reptile: "Reptile",
    other: "Other",
  };
  
  export const filterOptions = {
    species: [
        { id: "dog", label: "Dog" },
        { id: "cat", label: "Cat" },
        { id: "rabbit", label: "Rabbit" },
        { id: "hamster", label: "Hamster" },
        { id: "bird", label: "Bird" },
        { id: "fish", label: "Fish" },
        { id: "reptile", label: "Reptile" },
        { id: "other", label: "Other" },
      ],
      size: [
        { id: "small", label: "Small" },
        { id: "medium", label: "Medium" },
        { id: "large", label: "Large" },
      ],
      age: [
        { id: "puppy", label: "Puppy/Kitten" },
        { id: "adult", label: "Adult" },
        { id: "senior", label: "Senior" },
      ],
      gender: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "unknown", label: "Unknown" },
      ],
      colours: [
        { id: "black", label: "Black" },
        { id: "white", label: "White" },
        { id: "brown", label: "Brown" },
        { id: "grey", label: "Grey" },
        { id: "orange", label: "Orange" },
        { id: "yellow", label: "Yellow" },
        { id: "green", label: "Green" },
        { id: "blue", label: "Blue" },
        { id: "purple", label: "Purple" },
        { id: "red", label: "Red" },
        { id: "pink", label: "Pink" },
        { id: "beige", label: "Beige" },
        { id: "multi", label: "Multi" },
        { id: "other", label: "Other" },
        ],
  };
  
  export const sortOptions = [
    { id: "age-lowtohigh", label: "Age: Low to High" },
    { id: "age-hightolow", label: "Age: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];

  export const accountFormControls = [
    {
      category: "Basic Information",
      fields: [
        {
          label: "Username",
          name: "userName",
          componentType: "input",
          type: "text",
          placeholder: "Enter your username",
        },
        {
          label: "Email",
          name: "email",
          componentType: "input",
          type: "email",
          placeholder: "Enter your email",
        }
      ]
    },
    {
      category: "Personal Information",
      fields: [
        {
          label: "Full Name",
          name: "fullName",
          componentType: "input",
          type: "text",
          placeholder: "Enter your full name",
        },
        {
          label: "Gender",
          name: "gender",
          componentType: "select",
          options: [
            { id: "male", label: "Male" },
            { id: "female", label: "Female" },
            { id: "other", label: "Other" },
            { id: "prefer_not_to_say", label: "Prefer not to say" }
          ],
        },
        {
          label: "Date of Birth",
          name: "dateOfBirth",
          componentType: "input",
          type: "date",
          placeholder: "Select your date of birth",
        },
        {
          label: "Phone Number",
          name: "phoneNumber",
          componentType: "input",
          type: "tel",
          placeholder: "Enter your phone number",
        }
      ]
    },
    {
      category: "Password",
      fields: [
        {
          label: "Current Password",
          name: "currentPassword",
          componentType: "input",
          type: "password",
          placeholder: "Enter your current password",
        },
        {
          label: "New Password",
          name: "newPassword",
          componentType: "input",
          type: "password",
          placeholder: "Enter your new password",
        },
        {
          label: "Confirm New Password",
          name: "confirmPassword",
          componentType: "input",
          type: "password",
          placeholder: "Confirm your new password",
        }
      ]
    }
  ];

  export const adoptionFormControls = [
    {
      name: "livingSituation",
      label: "Describe your living situation (house/apartment, owned/rented)",
      placeholder: "Ex: Rented apartment, 2 rooms",
      componentType: "textarea", // Use textarea for longer descriptions
      required: true, // Mark fields as required if necessary
    },
    {
      name: "hasFence",
      label: "Do you have a safely fenced yard?",
      placeholder: "Yes / No / Not applicable",
      componentType: "text",
      required: true,
    },
    {
      name: "petExperience",
      label: "What experience do you have with similar pets?",
      placeholder: "Describe previous experience",
      componentType: "textarea",
      required: true,
    },
    {
      name: "vetNamePhone",
      label: "Name and phone number of your current/previous vet (if applicable)",
      placeholder: "Ex: Dr. Smith, 07xx xxx xxx",
      componentType: "text",
      required: false, // Make optional if needed
    },
    {
      name: "reasonForAdoption",
      label: "Why do you want to adopt this pet/these pets?",
      placeholder: "Reason for adoption",
      componentType: "textarea",
      required: true,
    },
  ];