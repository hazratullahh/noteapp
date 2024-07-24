export const limitCharecters = (str, limit) => str?.length > +limit ? `${str?.substring(0, +limit)}...` : str;

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
}