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
  
export const addAnimalFormElements = [
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
        path: "/shop/adopt",
    },
    {
      id: "dogs",
      label: "Dogs",
      path: "/shop/listing",
    },
    {
      id: "cats",
      label: "Cats",
      path: "/shop/listing",
    },
    {
      id: "fish",
      label: "Fish",
      path: "/shop/listing",
    },
    {
        id: "rabbits",
        label: "Rabbits",
        path: "/shop/listing",
      },
    {
        id: "about",
        label: "About Us",
        path: "/about",
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
      coloures: [
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
        { id: "multi", label: "Multi" },
        { id: "other", label: "Other" },
        ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
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
