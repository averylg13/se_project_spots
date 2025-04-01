//ARRAYS

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "an image of a snowy apartment building on a television",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "a cozy outdoor restaurant",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "people sitting at small tables drinking coffee",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "a very long bridge, over a forrest",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "a tunnel with light shining through windows",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "a wooden house in a snowy forrest",
  },
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    alt: "The Golden Gate bridge",
  },
];

//VARIABLES

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostButton = document.querySelector(".profile__add-button");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards");
const cardImage = document.querySelector(".card__image");

const previewModal = document.querySelector("#image-preview-modal");
const previewModalImage = previewModal.querySelector(".modal__preview-img");
const previewModalCaption = previewModal.querySelector(".modal__preview-caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__preview-exit-btn");

const closeButtons = document.querySelectorAll(".modal__close-btn");

//FUNCTIONS

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardName = cardElement.querySelector(".card__name");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__icon");
  const deleteButton = cardElement.querySelector(".card__delete-icon");

  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.alt;

  cardImage.addEventListener("click", () => {
    previewModalImage.src = data.link; // Set the modal's image source
    previewModalImage.alt = data.name; // Set the alt text
    previewModalCaption.textContent = data.name; // Set the caption text
    previewModal.classList.add("modal__preview_opened"); // Add class to open modal
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__icon_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function openModal(modal) {
  if (modal === profileEditButton) {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
  }
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function handleNewPostCreation(evt) {
  evt.preventDefault();
  const newPostCaption = document.getElementById("caption");
  const imageLinkInput = document.getElementById("image-link-input");
  const newCardData = {
    name: newPostCaption.value, 
    link: imageLinkInput.value,
    alt: "New user-generated post"
  };
  const newCard = getCardElement(newCardData);
  cardsList.prepend(newCard);
  closeModal(newPostModal);
  newPostCaption.value = "";
  imageLinkInput.value = "";
}

//EVENT LISTENERS

profileEditButton.addEventListener("click", () => openModal(editModal));
editFormElement.addEventListener("submit", handleEditFormSubmit);

newPostButton.addEventListener("click", () => openModal(newPostModal));
newPostForm.addEventListener("submit", handleNewPostCreation);

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

previewModalCloseBtn.addEventListener("click", () => {
  previewModal.classList.remove("modal__preview_opened"); // Remove class to hide modal
});

previewModal.addEventListener("click", (event) => {
  if(event.target === previewModal) {
    previewModal.classList.remove("modal__preview_opened");
  }
});


initialCards.forEach(function(item) {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
