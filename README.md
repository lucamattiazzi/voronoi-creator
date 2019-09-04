# Voronoi Creator

This library creates a Voronoi tassellation for a surface given the desired (relative) sizes of each cell in the Voronoi.

## How does it work

Clearly there are trivial solutions for this problem, just imagine n rectangles each spanning over the whole width and piled vertically so that the area of each rectangle is the desired one; this is a valid Voronoi diagram but I doubt that it's the one you're looking for (I am not).

### Start

Then the starting configuration is a randomized one, with centers of the cells set at random points on the surface.

### Gradient Descent

From this configuration a gradient descent algorithm is used to try and converge to the lowest error configuration.

### Cost Function

The cost function of the gradient descent is a function that, from the coordinates of all the centers, computes the errors of each cell as the ratio between `cellDesiredArea` and `cellCurrentArea` and returns the highest one.
We know this function to be smooth and continue, but (at least I) don't know how to solve it, we simply compute it's value near the current state and perturbate the system to find the local slope.

### Results

The results structure is an object with 2 values: one is an array that contains the coordinates of the centers of each cell. The other contains the final cost(error ratio) for each cell, and the worst one.

There are 2 versions of the function, one will simply return the final results, the other returns an async generator that will iterate over each step (and calculate it only when called). It's async since the implementation that I used for the gradient descent allows to use an async cost function, therefore always returns a Promise.

## Next steps

In this library the bottleneck to speed is clearly a stupid cost function that needs to be optimized. Therefore there are some issues to be solved:

- Use a more precise, fast and deterministic cost function, currently it's a MonteCarlo algorithm (slow, imprecise and random, but kinda works)

- There is a way faster algotithm to compute a local minimum, SPSA (Simultaneous Perturbation Stochastic Aproximation) that perturbates all variables at each time instead of iterating over each one. And it _should_ converge in the same number of iterations, but running way faster since it needs 2 * nCells times less cost function computations.

- Better handling of the alpha parameter, currently it gets lower when the result of the cost function is closer to the target, but could be better.

- Well some other stuff.
