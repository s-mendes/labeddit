export function goToHome(navigate) {
  navigate('/');
}

export function goToLogin(navigate) {
  navigate('/login');
}

export function goToSignUp(navigate) {
  navigate('/signup');
}

export function goToPost(navigate, postId) {
  navigate(`/post/${postId}`);
}
