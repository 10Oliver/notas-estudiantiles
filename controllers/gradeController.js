const calculateAverage = (req, res) => {
  try {
    const { grades } = req.body;

    const sum = grades.reduce((acc, curr) => acc + parseFloat(curr), 0);
    
    let average = sum / grades.length;
    average = Math.round(average * 100) / 100;

    const passed = average >= 6;
    const message = passed 
      ? 'Felicidades, el estudiante ha aprobado.' 
      : 'El estudiante no ha aprobado.';

    return res.status(200).json({
      average: average,
      passed: passed,
      message: message
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Ocurrió un error al calcular el promedio'
    });
  }
};

module.exports = {
  calculateAverage
};
