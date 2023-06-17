/** @format */

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }

  return (
    <footer className=" flex justify-center p-6 mt-6">
      <p className="font-mono font-extralight text-opacity-70">
        Note app, Department of Computer Science, University of Helsinki 2023
      </p>
    </footer>
  )
}

export default Footer
