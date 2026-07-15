const ListadoInverso = ({ iterable }) => {
  return (
    <ul>
      {[...iterable].reverse().map((palabra) => (
        <li key={palabra}>{`${palabra} suma ${palabra.length} puntos`}</li>
      ))}
    </ul>
  );
};
export default ListadoInverso;
